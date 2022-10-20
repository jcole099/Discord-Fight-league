//Register slash commands with Discord
//only need to run this when it is edited

const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with pong!'),
	new SlashCommandBuilder()
		.setName('server')
		.setDescription('Replies with server info!'),
	new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user info!'),
].map((command) => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);
//CREATE COMMANDS
rest
	.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) =>
		console.log(`Successfully registered ${data.length} application commands.`)
	)
	.catch(console.error);

//DELETE COMMANDS
// for guild-based commands
rest
	.delete(
		Routes.applicationGuildCommand(clientId, guildId, '1030415453685817344')
	)
	.then(() => console.log('Successfully deleted guild command'))
	.catch(console.error);

// for global commands
// rest
// 	.delete(Routes.applicationCommand(clientId, 'commandId'))
// 	.then(() => console.log('Successfully deleted application command'))
// 	.catch(console.error);

//DELETE ALL COMMANDS
// for guild-based commands
// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
// 	.then(() => console.log('Successfully deleted all guild commands.'))
// 	.catch(console.error);

// for global commands
// rest.put(Routes.applicationCommands(clientId), { body: [] })
// 	.then(() => console.log('Successfully deleted all application commands.'))
// 	.catch(console.error);
