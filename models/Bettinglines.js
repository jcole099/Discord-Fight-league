const mongoose = require('mongoose');

const createLinesSchema = new mongoose.Schema({
	fighterName: {
		type: String,
		required: [true, 'A fighter must have a name'],
		unique: true,
	},
	fighterOdds: {
		type: Number,
		required: [true, 'A fighter must have betting odds'],
	},
	opponentName: {
		type: String,
		required: [true, 'A fighter must have an opponent'],
		unique: true,
	},
	opponentOdds: {
		type: Number,
		required: [true, 'An opponent must have betting odds'],
	},
	index: {
		type: Number,
	},
});

const Bettinglines = mongoose.model('Bettinglines', createLinesSchema); //mongoose creates the collection with all lowercase, adds an 's' if not present

module.exports = Bettinglines;
