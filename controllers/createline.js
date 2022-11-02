const Bettinglines = require('../models/Bettinglines');
const sortLinesHelper = require('../helpers/sortLinesHelper');

//Must capitalize first letter of first name in order to be sorted.

module.exports = {
	name: 'createline',
	description: 'Creates a betting line',
	restriction: '',
	dm: false,
	args: 6,
	usage:
		'<fighter_firstname> <fighter_lastname> <fighter_odds> <opponent_firstname> <opponent_lastname> <opponent_odds>',
	async execute(
		message,
		args,
		freezeBets,
		commands,
		myGuild,
		warRoom,
		adminRoom
	) {
		//VALIDATION
		if (isNaN(args[2]) || isNaN(args[5])) {
			return message.channel.send(
				`You didn't provide appropriate arguments, ${message.author}! \nThe proper usage would be: \`${process.env.PREFIX}${this.name} ${this.usage}\``
			);
		}

		//EXECUTION
		try {
			const fighterName = args[0] + ' ' + args[1];
			const fighterOdds = args[2];
			const opponentName = args[3] + ' ' + args[4];
			const opponentOdds = args[5];

			const line = {
				fighterName,
				fighterOdds,
				opponentName,
				opponentOdds,
			};

			const line2 = {
				fighterName: opponentName,
				fighterOdds: opponentOdds,
				opponentName: fighterName,
				opponentOdds: fighterOdds,
			};

			await Bettinglines.create(line);
			await Bettinglines.create(line2);

			let reply = 'Betting line(s) created!\n\nActive lines:';
			const activeLines = await sortLinesHelper(); //reads collection, then re-asigns their index number based on order of fighterName

			for (newLine of activeLines) {
				if (newLine.fighterOdds > 0) {
					//adds a '+' to front of fighterOdds if positive
					reply += `\n**${newLine.index}** - **${newLine.fighterName}** **+${newLine.fighterOdds}** *(vs. ${newLine.opponentName})*`;
				} else {
					reply += `\n**${newLine.index}** - **${newLine.fighterName}** **${newLine.fighterOdds}** *(vs. ${newLine.opponentName})*`;
				}
			}

			return message.channel.send(reply);
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
