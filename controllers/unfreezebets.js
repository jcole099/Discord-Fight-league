module.exports = {
	name: 'unfreezebets',
	description: 'Unfreezes all bets',
	restriction: 'admin',
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
		freezeBets.status = false;
		return message.channel.send('**All bets UN-frozen**');
	},
};
