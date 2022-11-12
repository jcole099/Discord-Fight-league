module.exports = (activeBetsArray, message) => {
	try {
		//Sorts the array
		activeBetsArray.sort(function (a, b) {
			var nameA = JSON.parse(a).fighterName.toUpperCase(); // ignore upper and lowercase
			var nameB = JSON.parse(b).fighterName.toUpperCase(); // ignore upper and lowercase
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			// names must be equal
			return 0;
		});

		//Assigns appropriate index values to the new order
		let indexValue = 1;
		if (activeBetsArray.length > 0) {
			for (let bet of activeBetsArray) {
				bet = JSON.parse(bet);
				bet.index = indexValue;
				activeBetsArray[indexValue - 1] = JSON.stringify(bet);
				indexValue++;
			}
		}
		return activeBetsArray;
	} catch (err) {
		console.log('sortActiveBetsHelper Error');
		console.log(err);
		return message.channel.send(
			'sortActiveBetsHelper error. Please contact an Admin.'
		);
	}
};
