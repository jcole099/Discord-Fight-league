const mongoose = require('mongoose');

const playersSchema = new mongoose.Schema({
	playerName: {
		type: String,
		required: [true, 'A player must have a name'],
	},
	playerID: {
		type: Number,
		required: true,
		unique: [true, 'Limited to one player per discord account'],
	},
	playerSrike: {
		type: Boolean,
		default: false,
	},
	division: {
		type: String,
		default: 'Bronze',
	},
	bank: {
		type: Number,
		default: 1250,
	},
	activeBets: {
		type: [String],
	},
	previousBets: {
		type: [String],
	},
	rankingHistory: {
		type: [String],
	},
	primaryBetsRemaining: {
		type: Number,
		default: 3,
	},
});

const Players = mongoose.model('Players', playersSchema);

module.exports = Players;
