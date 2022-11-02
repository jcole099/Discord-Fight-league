module.exports = {
	name: 'clear',
	description: 'Clear chat history (testing)',
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
		message.channel.bulkDelete(100);
	},
};
