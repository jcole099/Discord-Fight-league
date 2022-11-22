//MEANT TO BE EXECUTED AFTER THE CONCLUDEWEEK COMMAND

const Players = require('../models/Players');
const Leaguestatus = require('../models/Leaguestatus');
const convertRankToPrevFormat = require('../helpers/convertRankToPrevFormat');
const calcNewDivision = require('../helpers/calcNewDivision');
const resolveTiesHelper = require('../helpers/resolveTiesHelper');
const inactiveNewDivision = require('../helpers/inactiveNewDivision');
const getPrevDivision = require('../helpers/getPrevDivision');

module.exports = {
	name: 'concludeseason',
	description: 'Restructures league rankings.',
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
			let curSeason = await Leaguestatus.find();
			curSeason = curSeason[0].season;

			const eliteCount = await Players.find({
				division: 'Elite',
			}).countDocuments();
			const mastersCount = await Players.find({
				division: 'Masters',
			}).countDocuments();
			const diamondCount = await Players.find({
				division: 'Diamond',
			}).countDocuments();
			const goldCount = await Players.find({
				division: 'Gold',
			}).countDocuments();
			const silverCount = await Players.find({
				division: 'Silver',
			}).countDocuments();
			const bronzeCount = await Players.find({
				division: 'Bronze',
			}).countDocuments();

			//RESET attributes for all players
			for (let player of userData) {
				//for all ACTIVE players
				if (player.division !== 'Inactive') {
					player.rankingHistory.push(
						convertRankToPrevFormat(curSeason, player.division, player.rank)
					);
					player.strike = false;
					player.startingBank = 1250;
					player.bank = 1250;
					player.movement = 0;



					// SET NEW DIVISION
					let curDivisionCount = 0;
					if (player.division === 'Elite') {
						curDivisionCount = eliteCount;
					} else if (player.division === 'Masters') {
						curDivisionCount = mastersCount;
					} else if (player.division === 'Diamond') {
						curDivisionCount = diamondCount;
					} else if (player.division === 'Gold') {
						curDivisionCount = goldCount;
					} else if (player.division === 'Silver') {
						curDivisionCount = silverCount;
					} else if (player.division === 'Bronze') {
						curDivisionCount = bronzeCount;
					}
					
					player.division = calcNewDivision(
						player.division,
						curDivisionCount,
						player.rank
					);

				} else {
					//REINSTATE INACTIVE PLAYERS
					player.strike = false;
					player.startingBank = 1250;
					player.bank = 1250;
					player.movement = 0;
					player.division = inactiveNewDivision(player)

					//TODO: Send inactive player a message informing them that they are active
					const inactiveGuy = await myGuild.members.fetch(player.playerID);
					await inactiveGuy.send('Your player status has changed to: **Active**\nA new season has started and all previously inactive players are now active. If you wish to discontinue playing, you do not need to do anything - you will automatically be removed from the league at the end of the second week. Alternatively, you may go inactive again if you wish.');
				}
			}

			//rerank divison based on Last Season Rank (the whole division will be a tie for player.startingBank)
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
				//Automatically ordered by startingBank due to division-wide tie
				let orderedDivPlayers = [];
				orderedDivPlayers = userData.filter((obj) => {
					return obj.division === division;
				});

				//CHECK FOR TIES AND BREAK THEM
				orderedDivPlayers = resolveTiesHelper(orderedDivPlayers);

				//ASSIGN RANK VALUES AND MOVEMENT, RESET PRIMARY BETS
				for (let index in orderedDivPlayers) {
					orderedDivPlayers[index].rank = parseInt(index) + 1;
					//SAVE PLAYER DATA
					await orderedDivPlayers[index].save();

					//SET PLAYER DISCORD ROLES
					if (orderedDivPlayers[index].isHuman) {
						const someGuy = await myGuild.members.fetch(orderedDivPlayers[index].playerID);

						//Check if player was not inactive last season
						if (await someGuy.roles.cache.find(role => role.name === 'Players')) {
							//IS ACTIVE PLAYER
							//Remove last division role
							const oldDivisionRole = await myGuild.roles.cache.find(
								(role) => role.name === getPrevDivision(orderedDivPlayers[index])
							);
							await someGuy.roles.remove(oldDivisionRole);

							//Add new division role
							const newDivisionRole = await myGuild.roles.cache.find(
								(role) => role.name === orderedDivPlayers[index].division
							);
							await someGuy.roles.add(newDivisionRole);
						} else {
							//IS INACTIVE PLAYER
							//ADD Player Role
							const playersRole = await myGuild.roles.cache.find(
								(role) => role.name === 'Players'
							);
							await someGuy.roles.add(playersRole);
							//Add division role
							const newDivisionRole = await myGuild.roles.cache.find(
								(role) => role.name === orderedDivPlayers[index].division
							);
							await someGuy.roles.add(newDivisionRole);
							
						}
					}
				}
			}

			//SET LEAGUE INFO to Season + 1, Week = 1
			const leagueInfo = await Leaguestatus.find(); //get league info
			leagueInfo[0].week = 1;
			leagueInfo[0].season = leagueInfo[0].season + 1;
			await leagueInfo[0].save();

			return await message.channel.send(
				'Season complete! League restructured!'
			);
		} catch (err) {
			console.log(err);
			return message.channel.send(
				`Controller error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
