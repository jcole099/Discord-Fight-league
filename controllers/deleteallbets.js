const Players = require('../models/Players');
const printBets = require('./printbets');

module.exports = {
	name: 'deleteallbets',
	description: 'Deletes all current bets',
	restriction: '',
	dm: true,
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
			//get player data
			const userData = await Players.findOne({ playerID: message.author.id });

			//Restore bank
			userData.activeBets.forEach((el) => {
				userData.bank += JSON.parse(el).amountBet; //add bank back
			});

			//delete bet locally
			userData.activeBets = [];

			//Restore primary bets
			userData.primaryBetsRemaining = 3;

			//upload data
			await Players.findOneAndUpdate({ playerID: message.author.id }, userData);

			let reply = `All bets deleted!\n\n`;
			//print bets
			reply += await printBets.execute(false, userData);
			message.channel.send(reply);

			return;
		} catch (err) {
			console.log(err);
			return message.channel.send(
				'deleteAllBetsController error. Please contact an Admin.'
			);
		}
	},
};
