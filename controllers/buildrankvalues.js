//IS CALLED BY ADMINS
//IS CALLED BY MOVEPLAYER.JS
const Players = require('../models/Players');

module.exports = {
	name: 'buildrankvalues',
	description:
		'DEVELOPMENT: Calculates the rank values for all league players based on their starting bank. Optional parameter of division.',
	restriction: '',
	dm: false,
	args: 0,
	usage: '<division>',
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
			let userData = await Players.find({});
			let divisionNames = [
				'Elite',
				'Masters',
				'Diamond',
				'Gold',
				'Silver',
				'Bronze',
			];
			if (divisionNames.includes(args[0])) {
				divisionNames = [args[0]];
			}

			//get all players from a each division
			for (let division of divisionNames) {
				let curDivisionPlayers = await Players.find({ division: division });
				let orderedDivPlayers = [];

				//Order division in a temp array
				for (let player of curDivisionPlayers) {
					let low = 0;
					let high = orderedDivPlayers.length;

					//Sorting
					while (low < high) {
						let mid = (low + high) >>> 1; //floor(divide by 2)
						if (orderedDivPlayers[mid].startingBank > player.startingBank) {
							low = mid + 1;
						} else {
							high = mid;
						}
					}
					//if equal, low is the index of the tie
					//splice inserts cur it at the tie location and pushes everything down the array
					//FIXME: MUST RESOLVE TIES
					orderedDivPlayers.splice(low, 0, player); //places ties unordered consecutively.
				}

				//assign rank values
				for (let index in orderedDivPlayers) {
					orderedDivPlayers[index].rank = parseInt(index) + 1;
					await orderedDivPlayers[index].save();
				}
			}

			return message.channel.send('build ranks complete');
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
