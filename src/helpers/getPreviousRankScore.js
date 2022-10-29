//Receives Player Object
//Returns a score based on previous season's division + rank within division

function getPreviousRankScore(player) {
	let rankings = player.rankingHistory;
	let lastRank = rankings[rankings.length - 1];

	//Base case - if player has no ranking history, return 0
	if (lastRank == undefined) return 0;

	// iterate until : found
	// check for case of b,s,g,d,m,e and assign 1000x score
	// add whatever follows the letter

	let score = '';
	let season = '';
	let divisionRank = '';

	//GET Season #
	for (const letter of lastRank) {
		if (letter !== ':') {
			lastRank = lastRank.substring(1); //returns the string exluding index 0
			season += letter;
		} else {
			divisionRank = lastRank.substring(1); //returns the string exluding index 0
			break;
		}
	}

	//Get Division
	if (divisionRank[0] === 'b') score = 1000;
	else if (divisionRank[0] === 's') score = 2000;
	else if (divisionRank[0] === 'g') score = 3000;
	else if (divisionRank[0] === 'd') score = 4000;
	else if (divisionRank[0] === 'm') score = 5000;
	else if (divisionRank[0] === 'e') score = 6000;
	else return 0; //case where player has been inactive, e.g. '4:0' - season 4, no division

	let rankNum = divisionRank.substring(1);
	score += parseInt(rankNum);

	return score;
}

export default getPreviousRankScore;
