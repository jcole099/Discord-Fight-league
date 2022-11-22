const Players = require('../models/Players');
const sortActiveBetsHelper = require('../helpers/sortActiveBetsHelper');
const printBets = require('./printbets');

module.exports = {
	name: 'deletebet',
	description: 'Deletes a current bet',
	restriction: '',
	dm: true,
	args: 1,
	usage: '<index_number>',
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

			//ARGUMENT VALIDATION
			let index = args;
			if (isNaN(index) && index < 1) {
				return message.channel.send(
					`You didn't provide appropriate arguments, ${message.author}! Ensure that the index of the bet to be deleted is a **positive number**`
				);
			}
			args = Math.floor(args);

			//check if userIndex is outside scope of actual index
			if (userData.activeBets.length < Number(args) || Number(args) < 1) {
				return message.channel.send(
					`Index provided is outside the scope of active bets. Please use command **!printbets** to view active bets, ${message.author}`
				);
			}

			//delete bet locally
			userData.activeBets.every((el, loopIndex) => {
				//every is same as forEach, using every to break out of loop
				if (JSON.parse(el).index === Number(args)) {
					userData.bank += JSON.parse(el).amountBet; //add bank back
					userData.activeBets.splice(loopIndex, 1);
					return false;
				}
				return true;
			});

			//restore primary bets (if applicable)
			let primaryBetsMade = 0;
			for (bet of userData.activeBets) {
				if (JSON.parse(bet).amountBet >= 250) primaryBetsMade++;
			}
			if (primaryBetsMade >= 3) {
				userData.primaryBetsRemaining = 0;
			} else {
				userData.primaryBetsRemaining = 3 - primaryBetsMade;
			}

			//sort bets
			userData.activeBets = sortActiveBetsHelper(userData.activeBets);

			//upload bets
			await Players.findOneAndUpdate({ playerID: message.author.id }, userData);

			//Print bets
			let reply = 'Bet deleted! \n\n';
			let replyAppend = await printBets.execute(false, userData);
			if (replyAppend === 'Active bets:') {
				replyAppend += '\n*There are no active bets*';
			}
			reply += replyAppend;
			message.channel.send(reply);

			return;
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
