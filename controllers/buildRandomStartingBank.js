const Players = require('../models/Players');

module.exports = {
	name: 'buildRandomStartingBank',
	description: 'Assigns random startingBanks to the entire league',
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
				player.startingBank = Math.floor(Math.random() * 3000) + 1250;
				await player.save(); //updates a player document https://mongoosejs.com/docs/documents.html
			}

			return message.channel.send('Build completed');
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};

//TESTING UPDATE ON ONE PLAYER
// let userData = await Players.findOne({ playerName: 'dmc_run' });
// userData.startingBank = Math.floor(Math.random() * 3000) + 1250;
// userData.__v = 0;
// console.log(userData);
// await Players.updateOne({ playerName: 'dmc_run' }, userData);
