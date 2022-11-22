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
                div = 'Elite';
                break;
            case 'm':
                div = 'Masters';
                break;
            case 'd':
                div = 'Diamond';
                break;
            case 'g':
                div = 'Gold';
                break;
            case 's':
                div = 'Silver';
                break;
            case 'b':
                div = 'Bronze';
                break;
        }
        return div;

	} catch (err) {
		console.log('getPrevDivision Error');
		console.log(err);
	}
};