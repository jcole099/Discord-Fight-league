const Bettinglines = require('../models/Bettinglines');

module.exports = async (message) => {
	try {
		const collection = await Bettinglines.find().sort({ fighterName: 1 });
		let indexValue = 1;
		for (document of collection) {
			document.index = indexValue;
			indexValue++;
		}
		await Bettinglines.deleteMany();
		await Bettinglines.insertMany(collection);
		return collection;
	} catch (err) {
		console.log(err);
		console.log('sortLinesHelper Error');
		return message.channel.send(
			'sortLinesHelper error. Please contact an Admin.'
		);
	}
};
