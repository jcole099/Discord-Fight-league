const Players = require('../models/Players');
const Bettinglines = require('../models/Bettinglines');
const sortActiveBetsHelper = require('../helpers/sortActiveBetsHelper');
const printBets = require('./printbets');

module.exports = {
	name: 'bet',
	description: 'Adds a bet',
	restriction: '',
	dm: false,
	args: 2,
	usage: '<bet_amount> <index_number>',
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
			//ARGUMENT VALIDATION
			let [bet, index] = args;

			//VALIDATION
			if (bet.startsWith('$')) bet = bet.slice(1);

			if (isNaN(bet) || isNaN(index)) {
				return await message.channel.send(
					`You didn't provide appropriate arguments, ${message.author}! Both arguments should be number values.`
				);
			} else if (bet <= 0) {
				return await message.channel.send(
					`You didn't provide appropriate arguments, ${message.author}! The bet amount must be a positive value.`
				);
			} else if (index < 1) {
				return await message.channel.send(
					`You didn't provide appropriate arguments, ${message.author}! The index value must be a positive integer.`
				);
			}

			//Ensures the arguments are integers
			bet = Math.floor(bet);
			index = Math.floor(index);

			let userData = await Players.findOne({ playerID: message.author.id });

			//check if bet amount does not exceed bank
			if (userData.bank < bet) {
				return await message.channel.send(
					`You do not have enough funds to place that bet, ${message.author}! Use **!bank** or **!printbets** to see your current bank balance.`
				);
			}

			//ensure index value isn't outside of index scope
			const lines = await Bettinglines.find();
			if (index > lines.length) {
				return await message.channel.send(
					`You didn't provide appropriate arguments, ${message.author}! The index value provided is outside the range of available betting lines.`
				);
			}

			//Gets the betting line that has an index matching the index supplied by the player
			const line = await Bettinglines.findOne({ index: index });

			//prevent duplicate bets
			for (let betLine of userData.activeBets) {
				let currentBet = JSON.parse(betLine);
				if (currentBet.fighterName === line.fighterName) {
					return message.channel.send(
						`A bet already exists for ${line.fighterName}! Use **!deletebet** to remove your previous bet.`
					);
				}
			}

			//prevent betting on both sides of a fight
			//ensure that the opponent name from the line.opponentName is not already in userData.activeBets.FighterName
			for (let userBets of userData.activeBets) {
				if (JSON.parse(userBets).fighterName === line.opponentName) {
					return message.channel.send(
						`Cannot bet on both sides of a fight! You already have a bet on ${
							JSON.parse(userBets).fighterName
						}. Use **!deletebet** to remove your previous bet. Use **!printlines** to print full betting lines that include the fighter and their opponent.`
					);
				}
			}

			//adding bet to local value
			//index is hard coded as a placeholder. sortActiveBetsHelper will order them later.
			userData.activeBets.push(
				`{ "fighterName": "${line.fighterName}", "amountBet": ${bet}, fighterOdds: ${line.fighterOdds} "index": 1
			}`
			);

			//reduces primary bets remaining
			if (bet >= 250 && userData.primaryBetsRemaining > 0) {
				userData.primaryBetsRemaining -= 1;
			}

			userData.bank -= bet;

			//Sort active betting line locally
			userData.activeBets = sortActiveBetsHelper(userData.activeBets, message);

			//Upload sorted active bets
			await Players.findOneAndUpdate({ playerID: message.author.id }, userData);

			//Print bets
			let reply = 'Bet created! \n\n';
			reply += await printBets.execute(false, userData);

			return message.channel.send(reply);
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
