const Bettinglines = require('../models/Bettinglines');

module.exports = {
	name: 'printlines',
	description: 'Print all active betting lines',
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
			let lines = await Bettinglines.find().sort({ fighterName: 1 }); //get all lines, sort them in order of name, ascending (1)
			let reply = '';
			for (line of lines) {
				if (line.fighterOdds > 0) {
					//adds a '+' to front of fighterOdds if positive
					reply += `\n**${line.index}** - **${line.fighterName}** **+${line.fighterOdds}** *(vs. ${line.opponentName})*`;
				} else {
					reply += `\n**${line.index}** - **${line.fighterName}** **${line.fighterOdds}** *(vs. ${line.opponentName})*`;
				}
			}
			if (reply === '') {
				reply = 'No active betting lines!';
			}
			await message.channel.send(reply);
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
