module.exports = (division, divisionCount, rank) => {
	try {
		//FOR ALL ACTIVE DIVISIONS
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
			} else if (rank > divisionCount - Math.round(divisionCount * 0.33)) {
				return 'Diamond';
			} else {
				return 'Masters';
			}
		}

		if (division === 'Diamond') {
			if (rank <= Math.round(divisionCount * 0.33)) {
				return 'Masters';
			} else if (rank > divisionCount - Math.round(divisionCount * 0.33)) {
				return 'Gold';
			} else {
				return 'Diamond';
			}
		}

		if (division === 'Gold') {
			if (rank <= Math.round(divisionCount * 0.33)) {
				return 'Diamond';
			} else if (rank > divisionCount - Math.round(divisionCount * 0.33)) {
				return 'Silver';
			} else {
				return 'Gold';
			}
		}

		if (division === 'Silver') {
			if (rank <= Math.round(divisionCount * 0.33)) {
				return 'Gold';
			} else if (rank > divisionCount - Math.round(divisionCount * 0.33)) {
				return 'Bronze';
			} else {
				return 'Silver';
			}
		}

		if (division === 'Bronze') {
			if (rank <= Math.round(divisionCount * 0.33)) {
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


