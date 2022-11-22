const Linesneedingresults = require('../models/Linesneedingresults');
const Leaguestatus = require('../models/Leaguestatus');
const Results = require('../models/Results');

module.exports = {
	name: 'selectwinner',
	description:
		'Sets the winner of a fight. Input 0 for index to print lines that still need a result',
	restriction: 'admin',
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
		try {
			//
			let index = args[0];
			//if user wants to get the list of results left to be implemented:
			if (index === '0') {
				await this.printLines(message);
				return;
			}

			//Get the two fight lines associated with the index value
			let winnerLine = await Linesneedingresults.find({ index: index }); //Get the winner line
			let loserLine = await Linesneedingresults.find({
				fighterName: winnerLine[0].opponentName,
			});

			// delete those lines
			await Linesneedingresults.deleteOne({ index: winnerLine[0].index });
			await Linesneedingresults.deleteOne({ index: loserLine[0].index });

			// Add winner name to results names array
			const leagueInfo = await Leaguestatus.find(); //get league info
			let curResults = await Results.find({
				season: leagueInfo[0].season,
				week: leagueInfo[0].week,
			});

			//Checks if results document for current season/week has been created. If not, creates it. Otherwise updates it.
			if (curResults.length === 0) {
				const newResult = {
					season: leagueInfo[0].season,
					week: leagueInfo[0].week,
					winnerNames: [`${winnerLine[0].fighterName}`],
				};
				await Results.create(newResult);
			} else {
				curResults[0].winnerNames.push(`${winnerLine[0].fighterName}`);
				await curResults[0].save();
			}

			//Print info
			await message.channel.send(
				`**${winnerLine[0].fighterName} added to winner's array**`
			);
			await this.printLines(message);
			return;
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
