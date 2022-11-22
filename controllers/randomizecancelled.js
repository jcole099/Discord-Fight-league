//A component of the End-of-week event.
//Should be one of the first main functions performed, after Freeze Bets has been issued.

//CURRENT BEHAVIOR:
//  the random bet could be another bet on an already bet fighter
//  the random bet could be on an opponent of an already bet fighter
const Players = require('../models/Players');
const Bettinglines = require('../models/Bettinglines');
const sortActiveBetsHelper = require('../helpers/sortActiveBetsHelper');

module.exports = {
	name: 'randomizecancelled',
	description:
		'Replaces bets that have been cancelled with another random bet of same value',
	restriction: 'admin',
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
		let userData = await Players.find({});
		let linesData = await Bettinglines.find({});
		let fighterNames = [];

		//Load all the names of fighters on betting lines into array
		//Used to check against player bets
		for (let bettingLine of linesData) {
			fighterNames.push(bettingLine.fighterName);
		}

		//iterate through each player
		for (let player of userData) {
			let changeOccurred = false; //using this to cut down on data transfer / increase efficiency

			//TODO: this IF condition is just for testing, remove it BEFORE DEPLOYMENT
			if (player.playerName === 'dmc_run') {
				//BUILD POOL of available bets
				//###########################################################################
				let betsAvailable = JSON.parse(JSON.stringify(linesData));

				//delete fighter lines
				let opponentNames = [];
				for (let playerBet of player.activeBets) {
					playerBet = JSON.parse(playerBet);
					for (let index in betsAvailable) {
						if (playerBet.fighterName == betsAvailable[index].fighterName) {
							opponentNames.push(betsAvailable[index].opponentName);
							//deletes fighterLine
							betsAvailable.splice(index, 1);
							break;
						}
					}
				}
				//remove opponent lines
				for (let opponentName of opponentNames) {
					for (let i = betsAvailable.length - 1; i >= 0; i--) {
						if (betsAvailable[i].fighterName === opponentName) {
							betsAvailable.splice(i, 1);
							break;
						}
					}
				}
				//###########################################################################

				//iterate through each bet
				for (let i = player.activeBets.length - 1; i >= 0; i--) {
					let bet = JSON.parse(player.activeBets[i]);
					let betAmount = 0;

					//look for cancelled fight
					if (!fighterNames.includes(bet.fighterName)) {
						//fight has been cancelled...
						changeOccurred = true;
						betAmount = bet.amountBet;
						let betTemplate = {
							fighterName: '',
							amountBet: 0,
							fighterOdds: 0,
							index: 0,
						};
						// delete current bet
						player.activeBets.splice(i, 1);

						//IF THERE ARE UNIQUE BETS AVAILABLE...
						if (betsAvailable.length > 0) {
							let randLineIndex = Math.floor(
								Math.random() * betsAvailable.length
							);
							let opponentName = betsAvailable[randLineIndex].opponentName;

							//build bet object from randomly selected line
							betTemplate.fighterName =
								betsAvailable[randLineIndex].fighterName;
							betTemplate.amountBet = betAmount; //use same bet amount
							betTemplate.fighterOdds =
								betsAvailable[randLineIndex].fighterOdds;
							betTemplate = JSON.stringify(betTemplate);
							player.activeBets.push(betTemplate);

							//delete betting line
							betsAvailable.splice(randLineIndex, 1);

							//delete opponentline
							for (let i = betsAvailable.length - 1; i >= 0; i--) {
								if (betsAvailable[i].opponentName === opponentName) {
									betsAvailable.splice(i, 1);
									break;
								}
							}
						} else {
							//THERE ARE NO UNIQUE BETS TO BET ON
							//will either dup bet, or bet on opponent
							//randomly select another fight to bet on
							let randLineIndex = Math.floor(Math.random() * linesData.length);

							//build bet object from randomly selected line
							betTemplate.fighterName = linesData[randLineIndex].fighterName;
							betTemplate.amountBet = betAmount; //use same bet amount
							betTemplate.fighterOdds = linesData[randLineIndex].fighterOdds;
							betTemplate = JSON.stringify(betTemplate);
							player.activeBets.push(betTemplate);
						}

						//sort bets... probably pointless
						player.activeBets = sortActiveBetsHelper(player.activeBets);

						//FOR TRUE UNIQUENESS:
						//would need to get betterlines
						//delete line and opponent for every bet
						//select randomly from leftover lines
						//this wouldn't work if the user placed bets on all lines
						//In that situation, would need a dup or opponent bet
					}
				}
			}
			if (changeOccurred) {
				await player.save();
			}
		}

		message.channel.send('**Randomized all cancelled bets!**');
	},
};
