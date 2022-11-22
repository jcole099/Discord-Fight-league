// SETS THE LEAGUE STATUS WEEK # AND SEASON # IN MONGO

const Leaguestatus = require('../models/Leaguestatus');

module.exports = {
	name: 'buildsetleaguestatus',
	description: 'Sets the league status values',
	restriction: '',
	dm: false,
	args: 0,
	usage: '<season_number> <week_number>',
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
			let updatedStatus = await Leaguestatus.find();

			updatedStatus[0].season = args[0];
			updatedStatus[0].week = args[1];

			await updatedStatus[0].save();

			const reply = `**League status updated!**\nSeason: ${args[0]}\nWeek: ${args[1]}`;

			message.channel.send(reply);
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
