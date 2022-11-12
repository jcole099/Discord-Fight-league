const mongoose = require('mongoose');

const leaguestatusSchema = new mongoose.Schema({
	season: {
		type: Number,
		required: [true, 'The league must have a season'],
	},
	week: {
		type: Number,
		required: [true, 'The league must have a week'],
	},
});

const Leaguestatus = mongoose.model('Leaguestatu', leaguestatusSchema);

module.exports = Leaguestatus;
