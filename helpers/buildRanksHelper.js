//TAKES A STRING INPUT FOR THE NAME OF THE DIVISION

//IS CALLED BY DELETEPLAYER, INACTIVE
const Players = require('../models/Players');
const resolveTiesHelper = require('./resolveTiesHelper');

module.exports = async (divisionToBeSorted) => {
	try {
		let divisionNames = [
			'Elite',
			'Masters',
			'Diamond',
			'Gold',
			'Silver',
			'Bronze',
		];

		//if the user specifies a division
		if (divisionNames.includes(divisionToBeSorted)) {
			divisionNames = [divisionToBeSorted];
		}

		//get all players from a each division
		for (let division of divisionNames) {
			let unorderedDivPlayers = await Players.find({ division: division });
			let orderedDivPlayers = [];

			//Order division in a temp array
			for (let player of unorderedDivPlayers) {
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
				orderedDivPlayers.splice(low, 0, player); //places ties unordered consecutively.
			}

			//CHECK FOR TIES AND BREAK THEM
			orderedDivPlayers = resolveTiesHelper(orderedDivPlayers);

			//assign rank values
			for (let index in orderedDivPlayers) {
				orderedDivPlayers[index].rank = parseInt(index) + 1;
				await orderedDivPlayers[index].save();
			}
		}
	} catch (err) {
		console.log(err);
	}
};
