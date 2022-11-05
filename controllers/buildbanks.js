const Players = require('../models/Players');

module.exports = {
	name: 'buildbanks',
	description:
		'DEVELOPMENT: Assigns random startingBanks and bank to the entire league',
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
				if (!player.isHuman) {
					player.startingBank = Math.floor(Math.random() * 3000) + 1250;
					player.bank = player.startingBank;
					await player.save(); //updates a player document https://mongoosejs.com/docs/documents.html
				}
			}

			return message.channel.send('New random banks assigned to league');
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
