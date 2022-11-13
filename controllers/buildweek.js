const buildbets = require('./buildbets');
const deleteresults = require('./deleteresults');
const selectwinner = require('./selectwinner');
const concludeweek = require('./concludeweek');

module.exports = {
	name: 'buildweek',
	description:
		'DEVELOPMENT: Simulates all activity during a week. Calls: !buildbets, !deleteresults, !selectwinner (3x: 1, 2, 4), !concludeweek',
	restriction: '',
	dm: false,
	args: 0,
	usage: '',
	async execute(
		message,
		args,
		freezeBets,
		commands,
		myGuild,
		warRoom,
		adminRoom
	) {
		try {
			await buildbets.execute(message);
			await deleteresults.execute(message);
			await selectwinner.execute(message, ['1']);
			await selectwinner.execute(message, ['2']);
			await selectwinner.execute(message, ['4']);
			await concludeweek.execute(message, 0, 0, 0, myGuild, 0, 0); //need to pass in the myGuild variable

			return message.channel.send('**WEEK BUILT!**');
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
