module.exports = {
	name: 'freezebets',
	description: 'Freezes all bets',
	restriction: '',
	dm: false,
	args: 0,
	usage: '',
	execute(message) {
		return message.channel.send('**All bets frozen**');
	},
};
