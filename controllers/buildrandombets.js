//THIS COMMAND CAN BE MODIFIED IN THE FUTURE TO ACCOMODATE BOTS\

const Players = require('../models/Players');
const Bettinglines = require('../models/Bettinglines');

module.exports = {
	name: 'buildrandombets',
	description: 'DEVELOPMENT: Assigns random bets to the entire league',
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
			//ALGORITHM
			let lines = await Bettinglines.find({});
			let userData = await Players.find({});

			//Building a master array of information needed
			let linesNames = [];
			for (let line of lines) {
				linesNames.push({
					fighterName: line.fighterName,
					opponentName: line.opponentName,
				});
			}

			for (let player of userData) {
				//for non human players only
				if (!player.isHuman) {
					let playerTempBetArray = [];

					//create copy, to be used in For loop
					let linesNamesCopy = linesNames.map((a) => {
						return { ...a };
					});

					for (let betCount = 1; betCount < 4; betCount++) {
						let randIndex = Math.floor(Math.random() * linesNamesCopy.length);

						//first two bets are 250
						if (betCount < 3) {
							//add bet to local variable
							playerTempBetArray.push(
								`{"fighterName":"${linesNamesCopy[randIndex].fighterName}","amountBet":250, "index":${betCount}}`
							); //TODO: ensure that this string is formated. Could be the source of error in the future
							//reduce bank
							player.bank -= 250;
						} else {
							//bet random 250 through balance
							let randBetAmount =
								Math.floor(Math.random() * player.bank - 250) + 250;
							playerTempBetArray.push(
								`{"fighterName":"${linesNamesCopy[randIndex].fighterName}","amountBet":${randBetAmount}, "index":${betCount}}`
							);
							player.bank -= randBetAmount;
						}

						//remove fighter and opponent lines (so can't dup bet or bet on opponent)
						let opponent = linesNamesCopy[randIndex].opponentName;

						linesNamesCopy.splice(randIndex, 1); //remove the bettingline
						//find opponent index
						let indexOfOpponent = null;
						for (let index in linesNamesCopy) {
							if (linesNamesCopy[index].opponentName === opponent) {
								indexOfOpponent = index;
								break;
							}
						}
						linesNamesCopy.splice(indexOfOpponent, 1); //This order matters. This first splice above will mutate the index values.
					}

					//Update bets array and push to DB
					player.activeBets = playerTempBetArray;
					await player.save();

					//moving on to next player
				}
			}

			return message.channel.send('Bets randomly assigned to league');
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
