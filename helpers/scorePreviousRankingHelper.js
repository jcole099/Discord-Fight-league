//Converts a player's previous ranking into a numerical score value
// Is called be the helper function "resolveTiesHelper"
module.exports = (obj) => {
	try {
		let score = 0;
		let lastRank = obj.rankingHistory[obj.rankingHistory.length - 1];
		lastRank = lastRank.split(':').pop();
		if (lastRank[0] === 'b') {
			score = 1000;
		} else if (lastRank[0] === 's') {
			score = 2000;
		} else if (lastRank[0] === 'g') {
			score = 3000;
		} else if (lastRank[0] === 'd') {
			score = 4000;
		} else if (lastRank[0] === 'm') {
			score = 5000;
		} else if (lastRank[0] === 'e') {
			score = 6000;
		} else {
			score = 0;
		}
		lastRank = lastRank.substring(1);
		//handle new players that have a tied score, just choose a random score for them.
		if (lastRank === 'ew') {
			lastRank = Math.floor(Math.random() * 999);
		}
		let subScore = 1000 - parseInt(lastRank);
		score += subScore;
		return score;
	} catch {
		console.log('scorePreviousRankingHelper Error');
	}
};
