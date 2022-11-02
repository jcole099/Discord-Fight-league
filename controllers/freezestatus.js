module.exports = {
	name: 'freezestatus',
	description: 'Returns the status of betting freeze',
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
		if (freezeBets.status === true) {
			return message.channel.send(`Bets are currently FROZEN`);
		} else {
			return message.channel.send(`Betting is available`);
		}
	},
};
