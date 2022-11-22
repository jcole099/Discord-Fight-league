// BEFORE USING THIS COMMAND:
// 1.) Ensure all winners are selected
// 2.) New betting lines are added

// CONCLUDE WEEK WORKFLOW~~~~~~~~~~~~~~~~~~~
// 1.) !buildbanks
// 2.) !buildranks

// ~can repeat 3-6 once the database is initialized.
// The !buildweek command accomplished the below tasks.
// 3.) !buildbets
// 4.) !deleteresults
// 5.) !selectwinner (3x)
// 6.) !concludeweek

const Players = require('../models/Players');
const Leaguestatus = require('../models/Leaguestatus');
const Results = require('../models/Results');
const resolveTiesHelper = require('../helpers/resolveTiesHelper');

module.exports = {
	name: 'concludeweek',
	description:
		'Calculates all player earnings. Restructures player ranks within divisions.',
	restriction: '',
	dm: false,
	args: 0,
	usage: '',
	async execute(
		message,
		args,
		freezeBets,
		commands,
		myGuild,
		warRoom,
		adminRoom
	) {
		try {
			let userData = await Players.find();

			const leagueInfo = await Leaguestatus.find(); //get league info
			const curResults = await Results.find({
				season: leagueInfo[0].season,
				week: leagueInfo[0].week,
			});
			const winnerNames = curResults[0].winnerNames;

			//ASSIGN NEW BANK DATA, PREVIOUSBETS, PREVIOUSRANK
			for (let i = userData.length - 1; i >= 0; i--) {
				let player = userData[i];
				//Skip inactive players
				if (player.division === 'Inactive') {
					continue;
				}
				
				let playerHasStriked = false;

				//CHECK FOR BETTING GUIDELINE ADHERENCE
				//TODO: remove player.ishuman once bot betting gets implemented
				if (player.isHuman) {
					if (
						player.startingBank - player.bank < 1250 ||
						player.primaryBetsRemaining !== 0
					) {
						if (player.strike) {
							//SECOND STRIKE
							//Remove roles
							const someGuy = await myGuild.members.fetch(player.playerID);
							const allRoles = await message.guild.roles.cache;
							await someGuy.roles.remove(allRoles);

							//delete data
							await Players.deleteOne({ playerID: player.playerID });
							await someGuy.send(
								`A **strike** has been incurred for failing to bet the minimum amount of $1250 or for not placing at least 3 (primary) bets of $250.\nYou have been removed from the league rankings for incurring 2 strikes within the same season. Come back and play anytime with the '!newplayer' command.`
							);

							//TODO: delete user from array
							// Record index so it can be deleted when the forloop finishes, below
							userData.splice(i, 1);
							continue;
						} else {
							//FIRST STRIKE
							player.strike = true;
							playerHasStriked = true; //not redundant, signifies new strike occurring (versus player.strike could be an older strike)
							const someGuy = await myGuild.members.fetch(player.playerID);
							let reply = `A **strike** has been incurred for failing to bet the minimum amount of $1250 or for not placing at least 3 (primary) bets of $250.`;
							reply += `\n*1.) All bets for this week will be nullified*`;
							reply += `\n*2.) The $1250 allowance for this week will be removed from your bank*`;
							await someGuy.send(reply);
						}
					}
				}

				let totalWinnings = 0;
				let totalBetAmount = 0; //this is used to refund player money if they have striked

				//CALCULATE WINNINGS
				//iteratate through every bet
				for (let betString of player.activeBets) {
					let bet = JSON.parse(betString);
					const odds = bet.fighterOdds;
					totalBetAmount += bet.amountBet;

					//Check if bet is a winner
					if (winnerNames.includes(bet.fighterName)) {
						//calc bet, add to running total
						if (odds >= 100) {
							totalWinnings += bet.amountBet * (odds / 100);
						} else {
							totalWinnings += 100 * (bet.amountBet / (odds * -1));
						}
						totalWinnings += bet.amountBet;
					} else {
						continue; //not a winner, check next bet
					}
				}

				//Update bank values to include winnings and allowance
				let newBank = 0;
				if (playerHasStriked) {
					//Player does not keep allowance from previous week
					//Player gets refunded their money placed on bets
					//No bet winnings awarded.
					//Grant new week allowance
					//Written this way for more intuitive understand of what is occurring.
					newBank = totalBetAmount + (player.bank - 1250) + 1250;
				} else {
					newBank = totalWinnings + player.bank + 1250;
					//place player's active bets into previous bets, clear active bets
					player.previousBets = player.activeBets;
				}

				player.startingBank = parseInt(newBank);
				player.bank = parseInt(newBank);
				//reset activeBets
				player.activeBets = [];

				//Save current rank to use to calculate movement value later
				player.previousRank = player.rank;
			}

			//REMOVE PLAYERS WHO INCURRED A SECOND STRIKE
			// for (let index of indexesToBeRemoved) {
			// 	userData.splice(index)
			// }

			//BUILD NEW RANK VALUES
			let divisionNames = [
				'Elite',
				'Masters',
				'Diamond',
				'Gold',
				'Silver',
				'Bronze',
			];

			for (let division of divisionNames) {
				let unorderedDivPlayers = userData.filter((obj) => {
					return obj.division === division;
				});
				let orderedDivPlayers = [];

				//Order division in a temp array
				for (let player of unorderedDivPlayers) {
					let low = 0;
					let high = orderedDivPlayers.length;

					//Sorting
					while (low < high) {
						let mid = (low + high) >>> 1; //floor(divide by 2)
						if (orderedDivPlayers[mid].startingBank > player.startingBank) {
							low = mid + 1;
						} else {
							high = mid;
						}
					}
					//if equal, low is the index of the tie
					//splice inserts cur it at the tie location and pushes everything down the array
					orderedDivPlayers.splice(low, 0, player); //places ties unordered consecutively.
				}

				//CHECK FOR TIES AND BREAK THEM
				orderedDivPlayers = resolveTiesHelper(orderedDivPlayers);

				//ASSIGN RANK VALUES AND MOVEMENT, RESET PRIMARY BETS
				for (let index in orderedDivPlayers) {
					orderedDivPlayers[index].rank = parseInt(index) + 1;
					orderedDivPlayers[index].movement =
						orderedDivPlayers[index].previousRank -
						orderedDivPlayers[index].rank;
					orderedDivPlayers[index].primaryBetsRemaining = 3;
					await orderedDivPlayers[index].save();
				}
			}

			// Increment week in league info
			leagueInfo[0].week = leagueInfo[0].week + 1;
			await leagueInfo[0].save();

			// test

			return await message.channel.send(
				'**End of week computation has completed!**'
			);
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
