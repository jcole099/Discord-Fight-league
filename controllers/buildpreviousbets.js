const Players = require('../models/Players');

module.exports = {
	name: 'buildpreviousbets',
	description:
		'DEVELOPMENT: Saves activeBets into previousBets attribute. Erases activeBets',
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
			let userData = await Players.find({});
			for (let player of userData) {
				player.previousBets = player.activeBets;
				player.activeBets = [];
				await player.save(); //updates a player document https://mongoosejs.com/docs/documents.html
			}

			return message.channel.send('previousBets saved.');
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
