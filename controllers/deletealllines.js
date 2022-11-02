const Bettinglines = require('../models/Bettinglines');

module.exports = {
	name: 'deletealllines',
	description: 'Deletes all documents in the active betting lines collection',
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
			await Bettinglines.deleteMany();
			return message.channel.send('All betting lines deleted!');
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
