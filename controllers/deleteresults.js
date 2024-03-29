//CREATES A CLEAN COPY OF BETTINGLINES INTO LINESNEEDINGRESULTS
//This is executed as part of the end of week commands
//Needs to be executed prior to selecting winners

const Bettinglines = require('../models/Bettinglines');
const Linesneedingresults = require('../models/Linesneedingresults');
const Leaguestatus = require('../models/Leaguestatus');
const Results = require('../models/Results');

module.exports = {
	name: 'deleteresults',
	description:
		'Deletes all results information. Places a fresh copy of the bettinglines into Linesneedingresults',
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
			let lines = await Bettinglines.find(); //get all lines
			await Linesneedingresults.deleteMany(); //delete all lines in collect

			//Make a fresh copy of betting lines and place them in the linesneedingresults collection
			for (let line of lines) {
				let lineCopy = {
					fighterName: line.fighterName,
					fighterOdds: line.fighterOdds,
					opponentName: line.opponentName,
					opponentOdds: line.opponentOdds,
					index: line.index,
					__v: line.__v,
				};
				await Linesneedingresults.create(lineCopy);
			}

			// Set winners results array to empty
			const leagueInfo = await Leaguestatus.find(); //get league info
			let curResults = await Results.find({
				season: leagueInfo[0].season,
				week: leagueInfo[0].week,
			});

			if (curResults.length > 0) {
				curResults[0].winnerNames = [];
				await curResults[0].save();
			}

			await message.channel.send(`**Results cleared**`);
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
