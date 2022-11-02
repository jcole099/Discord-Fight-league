const Bettinglines = require('../models/Bettinglines');
const sortLinesHelper = require('../helpers/sortLinesHelper');

module.exports = {
	name: 'deleteline',
	description: 'Deletes a betting line',
	restriction: '',
	dm: false,
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
		//VALIDATION
		if (isNaN(args[0])) {
			return message.channel.send(
				`You didn't provide appropriate arguments, ${message.author}! \nThe proper usage would be: \`${process.env.PREFIX}${this.name} ${this.usage}\``
			);
		}

		const collection = await Bettinglines.find(); //get lines so we can verify args[0] is within scope
		if (args[0] < 1 || args[0] > collection.length) {
			return message.channel.send(
				`Index provided is outside the scope of active betting lines. Please use command **!printlines** to view active betting lines, ${message.author}`
			);
		}

		//DELETE LINE
		try {
			const line = await Bettinglines.findOne({ index: args[0] });
			await Bettinglines.deleteOne({ fighterName: line.fighterName });
			await Bettinglines.deleteOne({ fighterName: line.opponentName });

			const newLines = await sortLinesHelper(message); //returns the sorted updated list of lines
			let reply = 'Line deleted!\n\nActive lines:';
			if (newLines.length === 0) {
				reply += `\n*There are no active lines.*`;
				return message.channel.send(reply);
			}
			for (nline of newLines) {
				if (nline.fighterOdds > 0) {
					//adds a '+' to front of fighterOdds if positive
					reply += `\n**${nline.index}** - **${nline.fighterName}** **+${nline.fighterOdds}** *(vs. ${nline.opponentName})*`;
				} else {
					reply += `\n**${nline.index}** - **${nline.fighterName}** **${nline.fighterOdds}** *(vs. ${nline.opponentName})*`;
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
