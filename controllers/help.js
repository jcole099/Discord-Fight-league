//TODO: implement admin vs user distinction

module.exports = {
	name: 'help',
	description: 'Displays a detailed list of commands',
	restriction: '',
	dm: true,
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

			function extractAdminCommands(value, key) {
				if (value.restriction === 'admin') {
					reply += `**!${key}**`;
					if (value.usage === '') {
						reply += ` - *${value.description}*\n`;
					} else {
						reply += ` ${value.usage} - *${value.description}*\n`;
					}
				}
			}

			//Build string of commands based on if author is admin or not
			const someGuy = await myGuild.members.fetch(message.author.id);
			if (someGuy._roles.includes(process.env.DISCORD_ADMINROLEID)) {
				//IF ADMIN
				reply += `**Admin commands**:\n`;
				commands.forEach(extractAdminCommands);
				reply += `\n\n`;
				await message.channel.send(reply);

				reply = `\n\n**Player commands**:\n`;
				commands.forEach(extractUserCommands);
				await message.channel.send(reply);
			} else {
				//IF USER
				reply = `**Player commands**:\n`;
				commands.forEach(extractUserCommands);
				await message.channel.send(reply);
			}

			return;
		} catch (err) {
			console.log(err);
			return message.channel.send(
				`Controller error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
