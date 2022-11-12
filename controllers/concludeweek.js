// BEFORE USING THIS COMMAND:
// 1.) Ensure all winners are selected
// 2.) New betting lines are added

const Players = require('../models/Players');
const Linesneedingresults = require('../models/Linesneedingresults');
const Leaguestatus = require('../models/Leaguestatus');
const Results = require('../models/Results');

module.exports = {
	name: 'concludeweek',
	description:
		'Calculates all player earnings. Restructures player ranks within divisions. Unfreezes bets.',
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
			const resultData = await Results;
			let userData = await Players.find();

			const leagueInfo = await Leaguestatus.find(); //get league info
			const curResults = await Results.find({
				season: leagueInfo[0].season,
				week: leagueInfo[0].week,
			});
			const winnerNames = curResults[0].winnerNames;

			//iterate through every player
			for (let player of userData) {
				let totalWinnings = 0;
				//iteratate through every bet
				for (let betString of player.activeBets) {
					let bet = JSON.parse(betString);
					//Check if bet is a winner
					if (winnerNames.includes(bet.fighterName)) {
						//calc bet, add to running total
						if (odds >= 100) {
							answer = bet * (odds / 100);
						} else {
							answer = 100 * (bet / (odds * -1));
						}
						answer += Number(bet);
						answer = answer.toFixed(0);
					} else {
						continue; //not a winner, check next bet
					}
				}
			}
			//place player's active bets into previous bets
			//clear active bets
			//update player startingBank and bank
			//call build rank values
			//update movement info
			//linesneedingresults
			//increment week in leagueinfo
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
