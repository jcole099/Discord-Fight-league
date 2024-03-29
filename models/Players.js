const mongoose = require('mongoose');

const playersSchema = new mongoose.Schema({
	playerName: {
		type: String,
		required: [true, 'A player must have a name'],
	},
	playerID: {
		type: String,
		required: true,
		unique: [true, 'Limited to one player per discord account'],
	},
	strike: {
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
	startingBank: {
		type: Number,
		default: 1250,
	},
	movement: {
		type: Number,
		default: 0,
	},
	activeBets: {
		type: [String],
	},
	previousBets: {
		type: [String],
	},
	rankingHistory: {
		type: [String],
		default: ['new'],
	},
	primaryBetsRemaining: {
		type: Number,
		default: 3,
	},
	isHuman: {
		type: Boolean,
		default: true,
	},
	rank: {
		type: Number,
		default: 0,
	},
	previousRank: {
		type: Number,
		default: 0,
	},
});

const Players = mongoose.model('Players', playersSchema);

module.exports = Players;
