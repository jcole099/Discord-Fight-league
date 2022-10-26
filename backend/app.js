//dmc_run ID: 260648339320733696
//Hailey IP: 104.168.19.177:59110

//IMPORTS
const Players = require('./models/Players');
const express = require('express');
const cors = require('cors'); //cors middleware
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

//GLOBAL EXPRESS VARIABLES
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

//MIDDLEWARE CONFIG FOR HTTPS
//use to enable all origins. Instead, we have specified an origin below.
// app.use(cors());

const corsOptions = {
	origin: 'https://www.discordfightleague.com',
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	methods: 'GET',
};

//EXPRESS ROUTES
app.get('/players', cors(corsOptions), async (req, res) => {
	console.log('route requested');
	//http://104.168.19.177:59110/players
	//http://discordfightleague.com:59110/players
	try {
		const getPlayersQuery = await Players.find();
		await res.status(200).json(getPlayersQuery);
	} catch (error) {
		console.error(error);
		res.status(500).json({ Error: 'Request Failed' });
	}
});

//INITIALIZE EXPRESS SERVER
app.listen(process.env.EXPRESSPORT, () => {
	console.log(`Express ready -> Port ${process.env.EXPRESSPORT}`);
});
