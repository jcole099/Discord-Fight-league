// CALLED BY CONCLUDESEASON

module.exports = (season, division, rank) => {
	try {
		let prevRank = '';
		prevRank = season + ':';

		let divisionLetter = '';
		if (division === 'Elite') {
			divisionLetter = 'e';
		} else if (division === 'Masters') {
			divisionLetter = 'm';
		} else if (division === 'Diamond') {
			divisionLetter = 'd';
		} else if (division === 'Gold') {
			divisionLetter = 'g';
		} else if (division === 'Silver') {
			divisionLetter = 's';
		} else if (division === 'Bronze') {
			divisionLetter = 'b';
		}

		prevRank = prevRank + divisionLetter + rank;

		return prevRank;
	} catch (err) {
		console.log('convertRankToPrevFormat Error');
		console.log(err);
	}
};
