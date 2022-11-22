const Players = require('../models/Players');
//The printbets function can be used in one of two different ways. First, as a standalone command. Second, as a helper function to print betting lines and bank info.
// The commands that call this as a helper function are: DELETEBET and BET

module.exports = {
	name: 'printbets',
	description: 'Prints all active bets',
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
			let reply = 'Active bets:';
			//The following if block is created because printbets can get called two ways.
			//	1.) From the user, which retrieves data from the DB
			//	2.) from the bets controller, which supplies this function with an array of data (No DB READ required)
			if (message !== false) {
				//if I want printbets to access the database
				const userData = await Players.findOne({ playerID: message.author.id });
				const userBets = [];

				//Checks to see if user has any bets
				if (userData.activeBets.length === 0) {
					reply += '\n**There are no active bets**';
					reply += `\n\n*Bank: ${userData.bank}*\n*Primary Bets Remaining: ${userData.primaryBetsRemaining}\nRemaining money required to spend this week: $1250*`;
					return await message.channel.send(reply);
				}

				//Builds an easily readable list of active bets
				let totalSpentWeek = 0;
				for (let bet of userData.activeBets) {
					totalSpentWeek += JSON.parse(bet).amountBet;
					userBets.push(JSON.parse(bet).fighterName);
					reply += `\n**${JSON.parse(bet).index}** - **${
						JSON.parse(bet).fighterName
					}** *$${JSON.parse(bet).amountBet}*`;
				}

				//amount remaining required to spend this week:
				let remainingToSpendWeek = 0;
				if (1250 - totalSpentWeek > 0) {
					remainingToSpendWeek = 1250 - totalSpentWeek;
				}

				//Adds the bank value to the end of the message
				reply += `\n\n*Bank: $${userData.bank}*\n*Primary Bets Remaining: ${userData.primaryBetsRemaining}\nRemaining money required to spend this week: $${remainingToSpendWeek}*`;
			} else {
				//if I am supplying the array and dont want printbets to access the database
				let totalSpentWeek = 0;

				//add active bet lines
				if (args.activeBets.length === 0) {
					reply += `\n**There are no active bets**`;
				} else {
					for (let bet of args.activeBets) {
						totalSpentWeek += JSON.parse(bet).amountBet;
						reply += `\n**${JSON.parse(bet).index}** - **${
							JSON.parse(bet).fighterName
						}** *$${JSON.parse(bet).amountBet}*`;
					}
				}
				//add bank info
				let remainingToSpendWeek = 0;
				if (1250 - totalSpentWeek > 0) {
					remainingToSpendWeek = 1250 - totalSpentWeek;
				}

				reply += `\n\n*Bank: $${args.bank}*\n*Primary Bets Remaining: ${args.primaryBetsRemaining}\nRemaining money required to spend this week: $${remainingToSpendWeek}*`;
				return reply;
			}
			message.channel.send(reply);
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
