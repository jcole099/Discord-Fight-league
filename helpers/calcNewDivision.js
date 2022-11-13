module.exports = (division, divisionCount, rank) => {
	try {
		if (division === 'Elite') {
			if (rank <= 7) {
				return 'Elite';
			} else {
				return 'Masters';
			}
		}

		if (division === 'Masters') {
			if (rank <= 3) {
				return 'Elite';
			} else if (rank > divisionCount - Math.floor(divisionCount * 0.33)) {
				return 'Diamond';
			} else {
				return 'Masters';
			}
		}

		if (division === 'Diamond') {
			if (rank <= Math.floor(divisionCount * 0.33)) {
				return 'Masters';
			} else if (rank > divisionCount - Math.floor(divisionCount * 0.33)) {
				return 'Gold';
			} else {
				return 'Diamond';
			}
		}

		if (division === 'Gold') {
			if (rank <= Math.floor(divisionCount * 0.33)) {
				return 'Diamond';
			} else if (rank > divisionCount - Math.floor(divisionCount * 0.33)) {
				return 'Silver';
			} else {
				return 'Gold';
			}
		}

		if (division === 'Silver') {
			if (rank <= Math.floor(divisionCount * 0.33)) {
				return 'Gold';
			} else if (rank > divisionCount - Math.floor(divisionCount * 0.33)) {
				return 'Bronze';
			} else {
				return 'Silver';
			}
		}

		if (division === 'Diamond') {
			if (rank <= Math.floor(divisionCount * 0.33)) {
				return 'Silver';
			} else {
				return 'Bronze';
			}
		}
	} catch (err) {
		console.log('calcNewDivision Error');
		console.log(err);
	}
};

// let rankUpNum = Math.floor(players.length * 0.33);
// let rankDownNum = players.length - rankUpNum;
// rankUpNum -= 1;
19 - Math.floor(19 * 0.33);
