const Players = require('../models/Players');
const Leaguestatus = require('../models/Leaguestatus');
const Results = require('../models/Results');
const Bettinglines = require('../models/Bettinglines');
const Linesneedingresults = require('../models/Linesneedingresults');
const fs = require('fs');

module.exports = {
	name: 'backupdata',
	description: 'OWNER ONLY - Saves the database to a series of files.',
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
		try {
			if (message.author.id !== process.env.DISCORD_OWNERID) {
				return await message.channel.send(
					`**Only the server owner can execute this command!**`
				);
			}
			const playerData = await Players.find();
			const leagueData = await Leaguestatus.find();
			const resultData = await Results.find();
			const bettingLineData = await Bettinglines.find();
			const linesNeedingResultsData = await Linesneedingresults.find();

			fs.writeFile(
				'./data/backup_players.json',
				JSON.stringify(playerData),
				(err) => {
					if (err) console.log(err);
					console.log('Player data saved');
				}
			);
			fs.writeFile(
				'./data/backup_leagueData.json',
				JSON.stringify(leagueData),
				(err) => {
					if (err) console.log(err);
					console.log('leagueData data saved');
				}
			);
			fs.writeFile(
				'./data/backup_resultData.json',
				JSON.stringify(resultData),
				(err) => {
					if (err) console.log(err);
					console.log('resultData data saved');
				}
			);
			fs.writeFile(
				'./data/backup_bettingLineData.json',
				JSON.stringify(bettingLineData),
				(err) => {
					if (err) console.log(err);
					console.log('bettingLineData data saved');
				}
			);
			fs.writeFile(
				'./data/backup_linesNeedingResultsData.json',
				JSON.stringify(linesNeedingResultsData),
				(err) => {
					if (err) console.log(err);
					console.log('linesNeedingResultsData data saved');
				}
			);

			message.channel.send('Database data saved');
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
