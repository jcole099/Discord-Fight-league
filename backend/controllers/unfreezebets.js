module.exports = {
	name: 'unfreezebets',
	description: 'Unfreezes all bets',
	restriction: '',
	dm: false,
	args: 0,
	usage: '',
	execute(message) {
		return message.channel.send('**All bets UN-frozen**');
	},
};
