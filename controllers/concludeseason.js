//MEANT TO BE EXECUTED AFTER THE CONCLUDEWEEK COMMAND

const Players = require('../models/Players');
const Leaguestatus = require('../models/Leaguestatus');
const convertRankToPrevFormat = require('../helpers/convertRankToPrevFormat');
const calcNewDivision = require('../helpers/calcNewDivision');
const resolveTiesHelper = require('../helpers/resolveTiesHelper');

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
			let oldDivisionName = ''
			let newDivisionName = ''

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

			for (let player of userData) {
				player.rankingHistory.push(
					convertRankToPrevFormat(curSeason, player.division, player.rank)
				);
				oldDivisionName = player.division
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
				newDivisionName = player.division
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

					//TODO: SET PLAYER ROLES
					if (orderedDivPlayers[index].isHuman) {
						const oldDivision = await message.guild.roles.cache.find(
							(role) => role.name === oldDivisionName
						);
						const newDivision = await message.guild.roles.cache.find(
							(role) => role.name === newDivisionName
						);
						const playerToBeMoved = await myGuild.members.fetch(orderedDivPlayers[index].playerID)
						await playerToBeMoved.roles.add(newDivision);
						await playerToBeMoved.roles.remove(oldDivision);
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
