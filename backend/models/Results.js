const mongoose = require('mongoose');

const resultsSchema = new mongoose.Schema({
	winnerName: {
		type: String,
		required: [true, 'A winning fighter must have a name'],
	},
	winnerOdds: {
		type: Number,
		required: [true, 'A winner must have odds'],
	},
	loserName: {
		type: String,
		required: [true, 'A losing fighter must have a name'],
	},
	loserOdds: {
		type: Number,
		required: [true, 'A loser must have odds'],
	},
	winType: {
		type: String,
		required: [true, 'A result must have a win type'],
	},
	season: {
		type: Number,
		required: [true, 'A season is required'],
	},
	week: {
		type: Number,
		required: [true, 'A week is required'],
	},
});

const Results = mongoose.model('Results', resultsSchema);

module.exports = Results;
