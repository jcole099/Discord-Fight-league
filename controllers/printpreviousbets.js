const Players = require('../models/Players');

module.exports = {
	name: 'printpreviousbets',
	description:
		"View a player's bets from the previous event (case sensitive). Do not include a user name to view your own previous bets.",
	restriction: '',
	dm: false,
	args: 0,
	usage: '<player_name>',
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
			let userData = '';
			//See if user wants to view their own previousbets or not
			if (args[0]) {
				userData = await Players.find({ playerName: args[0] });
			} else {
				userData = await Players.find({ playerID: message.author.id });
			}

			//VALIDATION
			if (userData.length === 0) {
				return message.channel.send(
					'There was no player found with that name.'
				);
			}

			//BUILD REPLY STRING
			if (userData.length > 1) {
				message.channel.send(`**${userData.length} results found!**`);
			}

			let reply = '';
			for (let playerIndex in userData) {
				reply = `**Player name:** ${userData[playerIndex].playerName}\n`;
				reply += `Division:Rank = ${userData[playerIndex].division}: ${userData[playerIndex].rank}\n`;

				//if the user has previous bets...
				if (userData[playerIndex].previousBets.length > 0) {
					for (let betIndex in userData[playerIndex].previousBets) {
						if (userData[playerIndex].previousBets.length === 0) {
							reply += '*Player has no previous bets*';
							message.channel.send(reply);
							break;
						} else {
							let betJSON = JSON.parse(
								userData[playerIndex].previousBets[betIndex]
							);
							reply += `Bet #${parseInt(betIndex) + 1}: ${
								betJSON.fighterName
							} $${betJSON.amountBet}\n`;
						}
					}
					message.channel.send(reply);
				} else {
					reply += '*Player has no previous bets*';
					message.channel.send(reply);
				}
			}

			return;
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
