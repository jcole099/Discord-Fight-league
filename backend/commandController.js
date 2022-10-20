//message.channel.type: 1 for dm
//message.channel.type: 0 for chat

module.exports = async (message, client) => {
	//ignore messages that don't start with command prefix or messages from the bot
	if (!message.content.startsWith(process.env.PREFIX) || message.author.bot)
		return;

	//build args array (command + args)
	//  1.) remove prefix
	//  2.) remove whitespace before or after
	//  3.) create array of sub strings
	const args = message.content
		.slice(process.env.PREFIX.length)
		.trim()
		.split(/ +/);

	//assigns commandname to first el of args array, removes el from args array
	const commandName = args.shift().toLowerCase();

	//if the command name doesn't exist, return
	if (!client.commands.has(commandName)) return;

	//IT HAS BEEN VERIFIED THAT THE COMMAND IS VALID

	//load command data into var 'command'
	const command = client.commands.get(commandName);

	//Ignore all commands if user doesn't have the player role, UNLESS it is an admin command
	const myGuild = await client.guilds.cache.get('789531340084215888'); //get server information
	const someGuy = await myGuild.members.fetch(message.author.id);
	if (
		!someGuy._roles.includes('823970510853242920') &&
		command.name !== 'newplayer' &&
		command.restriction === ''
	) {
		return message.author.send(
			`You must be a current player to use that command! Type '!newplayer' to start playing.`
		);
	}

	//ensures that appropriate arguments are included with the command. If not, sends the user a reply with proper syntax
	if (command.args && args.length != command.args) {
		let reply = `You didn't provide appropriate arguments, ${message.author}!`;
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${process.env.PREFIX}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
	}

	//TODO: Check for admin restriction, admin commands are not allowed in DMs

	//Check for dm channel restriction
	if (command.dm && message.guild != null) {
		try {
			await message.delete();
		} catch {
			console.log('Error deleting message!');
		}
		return await message.author.send(
			`!${command.name} should be typed in this DM channel.`
		);
	}

	//EXECUTING COMMANDS
	try {
		//TODO: Check for freezebets status

		//Check commands for special arguments that need to be passed
		if (command.name === 'newplayer') {
			warRoom = client.channels.cache.get('1030443410034790492');
			command.execute(message, myGuild, warRoom);
		} else {
			command.execute(message, args);
		}
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
};