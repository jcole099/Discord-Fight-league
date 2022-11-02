module.exports = {
	name: 'help',
	description: 'Returns a detailed list of commands',
	restriction: '',
	dm: false,
	args: 0,
	usage: '',
	async execute(message, commands, myGuild) {
		try {
			let reply = ``;

			function extractUserCommands(value, key) {
				if (value.restriction === '') {
					reply += `**!${key}**`;
					if (value.usage === '') {
						reply += ` - *${value.description}*\n`;
					} else {
						reply += ` ${value.usage} - *${value.description}*\n`;
					}
				}
			}

			//Build string of commands
			//TODO: Build a different string if the player is an admin
			commands.forEach(extractUserCommands);

			return message.channel.send(reply);
		} catch (err) {
			console.log(err);
			return message.channel.send(
				`Controller error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
