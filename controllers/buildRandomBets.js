const Players = require('../models/Players');
const Bettinglines = require('../models/Bettinglines');

module.exports = {
	name: 'buildRandomBets',
	description: 'Assigns random bets to the entire league',
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
				player.__v = 0;
				await player.save(); //updates a player document https://mongoosejs.com/docs/documents.html
			}

			//get all data
			//for each player - build bet array
			//LOOP 3x ->
			//select a random number 0 through bettinglines.length - 1
			//select a random bet amount 250 through ????
			//player.bank - bet amount
			//append bet to local
			//repeat

			//algorithm for bet ammount:
			return message.channel.send('Build completed');
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
