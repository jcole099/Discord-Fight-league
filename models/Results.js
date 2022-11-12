const mongoose = require('mongoose');

const resultsSchema = new mongoose.Schema({
	winnerNames: {
		type: [String],
		required: [true, 'A winning fighter must have a name'],
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
