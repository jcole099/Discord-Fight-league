const Players = require('../models/Players');

module.exports = {
	name: 'bank',
	description: "Returns the amount left in a player's bank",
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
			const userData = await Players.find({ playerID: message.author.id });

			let totalSpentWeek = 0;
			if (userData[0].activeBets.length > 0) {
				for (let bet of userData[0].activeBets) {
					totalSpentWeek += JSON.parse(bet).amountBet;
				}
			}

			//amount remaining required to spend this week:
			let remainingToSpendWeek = 0;
			if (1250 - totalSpentWeek > 0) {
				remainingToSpendWeek = 1250 - totalSpentWeek;
			}

			const reply = `**Bank: $${userData[0].bank}**\n*Primary Bets Remaining: ${userData[0].primaryBetsRemaining}\nRemaining money required to spend this week: $${remainingToSpendWeek}*`;

			message.channel.send(reply);
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
