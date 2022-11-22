//Only the server owner (dmc_run) is able to execute this command
const Players = require('../models/Players');
const Leaguestatus = require('../models/Leaguestatus');
const Results = require('../models/Results');

module.exports = {
	name: 'resetleague',
	description:
		'NUCLEAR - OWNER ONLY: Erases all rankingHistory data, ranks, banks, leagueinfo, results info',
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
				return await message.channel.send(`**Only the server owner can execute this command!**`)
			}
			let userData = await Players.find();
			for (let player of userData) {
				player.rankingHistory = ['new'];
				player.bank = 1250;
				player.startingBank = 1250;
				player.previousBets = [];
				player.activeBets = [];
				player.strike = false;
				player.movement = 0;
				await player.save();
			}

			let leagueInfo = await Leaguestatus.find();
			leagueInfo[0].week = 1;
			leagueInfo[0].season = 1;
			await leagueInfo[0].save();

			await Results.collection.drop();

			message.channel.send(`**League reset!**`);
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
