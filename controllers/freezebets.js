module.exports = {
	name: 'freezebets',
	description: 'Freezes all bets',
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
		freezeBets.status = true;
		return message.channel.send('**All bets frozen**');
	},
};
