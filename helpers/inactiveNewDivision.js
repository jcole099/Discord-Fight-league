module.exports = (player) => {
	try {
        let lastRank = player.rankingHistory[player.rankingHistory.length - 1];
        for (const letter of lastRank) {
            if (letter !== ':') {
                lastRank = lastRank.substring(1); //returns the string exluding index 0
                // season += letter; //not using the season yet
            } else {
                lastRank = lastRank.substring(1); //returns the string exluding index 0
                break;
            }
        }

        let div = '';
        switch (lastRank[0]) {
            case 'e':
                div = 'Masters';
                break;
            case 'm':
                div = 'Diamond';
                break;
            case 'd':
                div = 'Gold';
                break;
            case 'g':
                div = 'Silver';
                break;
            case 's':
                div = 'Bronze';
                break;
            case 'b':
                div = 'Bronze';
                break;
        }
        return div;

	} catch (err) {
		console.log('inactiveNewDivision Error');
		console.log(err);
	}
};