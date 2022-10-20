//dmc_run ID: 260648339320733696

//IMPORTS
const commandController = require('./commandController.js');
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('node:path');
const {
	Client,
	Collection,
	GatewayIntentBits,
	InteractionCollector,
	Partials,
} = require('discord.js'); //partials included for dm functionality
dotenv.config({ path: './config.env' });

//Global discord variable
//Intents give the bot specific access to information.
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMembers,
	],
	partials: [Partials.Message, Partials.Channel],
});
//hello
//SETTING UP COMMAND LIBRARY
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'controllers');
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.name, command); //was broken, fixed by replacing command.data.name with command.name
}

// To view the client.commands Map (testing):
// console.log([...client.commands.entries()]);

//HANDLING COMMANDS
client.on('messageCreate', async (message) => {
	await commandController(message, client);
});

// CONNECT TO DISCORD
client.once('ready', () => {
	console.log('Discord connection successful!');
});
client.login(process.env.TOKEN);

// CONNECT TO MONGODB
const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		// useCreateIndex: true,
		// useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('DB connection successful!');
	});

client.login(process.env.TOKEN);
