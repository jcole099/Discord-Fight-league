import getPreviousRankScore from './getPreviousRankScore.mjs';

const player1 = {
	rankingHistory: [],
};
const player2 = {
	rankingHistory: ['4:s9', '5:0'],
};
const player3 = {
	rankingHistory: ['11:d29', '12:m24'],
};
const player4 = {
	rankingHistory: ['113:g2', '114:g1'],
};

// console.log(`PLAYER1: ${getPreviousRankScore(player1)}`);
console.log(`PLAYER2: ${getPreviousRankScore(player2)}`);
// console.log(`PLAYER3: ${getPreviousRankScore(player3)}`);
// console.log(`PLAYER4: ${getPreviousRankScore(player4)}`);
