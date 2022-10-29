module.exports = {
	name: 'clear',
	description: 'Clear chat history (testing)',
	restriction: '',
	dm: false,
	args: 0,
	usage: '',
	execute(message, args) {
		message.channel.bulkDelete(100);
	},
};
