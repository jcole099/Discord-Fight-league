const Bettinglines = require('../models/Bettinglines');

module.exports = {
	name: 'printlines',
	description: 'Print all active betting lines',
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
			let lines = await Bettinglines.find().sort({ index: 1 }); //get all lines, sort them by index (already sorted by fightername), ascending (1)
			let reply = '';
			for (let line of lines) {
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
