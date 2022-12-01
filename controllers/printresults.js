const Results = require('../models/Results');
const Leaguestatus = require('../models/Leaguestatus');

module.exports = {
	name: 'printresults',
	description: 'Prints the current set of results',
	restriction: 'admin',
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
			// Add winner name to results names array
			const leagueInfo = await Leaguestatus.find(); //get league info
			let curResults = await Results.findOne({
				season: leagueInfo[0].season,
				week: leagueInfo[0].week,
			});

			let reply = `Current winners: \n`;

			//check if any data has been saved yet
			if (!curResults) {
				reply += `<none>`;
				return await message.channel.send(reply);
			}
			//Build reply
			for (let fighterName of curResults.winnerNames) {
				reply += `${fighterName}\n`;
			}

			return await message.channel.send(reply);
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
	async printLines(message) {
		let lines = await Linesneedingresults.find().sort({ index: 1 }); //get all lines, sort them by index (already sorted by fightername), ascending (1)
		let reply = '**Lines needing results:**';
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
	},
};
