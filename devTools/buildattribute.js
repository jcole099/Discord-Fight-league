//old command used in development to add attributes to player database data
const Players = require('../models/Players');

module.exports = {
	name: 'buildattribute',
	description: 'DEVELOPMENT: used to build an attribute to the database',
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
			('use strict');
			let userCount = await Players.find().countDocuments();

			console.log(`TOTAL PLAYER COUNT: ${userCount}`);

			// for (let player of userData) {
			// 	// console.log(player);
			// 	// player.playerStrike = undefined;
			// 	// player.playerSrike = undefined;
			// 	// // let multiplier = 1;
			// 	// // let randNegative = Math.random();
			// 	// // randNegative < 0.5 ? (multiplier = -1) : (multiplier = 1);
			// 	// // player.movement = Math.floor(Math.random() * 10) * multiplier;
			// 	// await player.save(); //updates a player document https://mongoosejs.com/docs/documents.html
			// }

			return message.channel.send('Build attribute complete');
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
