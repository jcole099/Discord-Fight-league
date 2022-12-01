const Players = require('../models/Players');
module.exports = {
	name: 'newplayer',
	description: 'Join the league as a new player',
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
		try {
			//VALIDATION
			let userData = await Players.find({ playerID: message.author.id });
			if (userData.length > 0) {
				if (userData[0].division === 'Inactive') {
					return await message.author.send(
						'**You are currently on inactive status**. If you wish to rejoin the league immediately as a Bronze player, contact an Admin. Otherwise, please wait until the end of the season for your inactive status to expire.'
					);
				} else {
					return await message.author.send(
						'You are currently an active player!'
					);
				}
			}

			//GET RANK VALUE (bottom of bronze division)
			let bronzePlayerCount = await Players.find({ division: 'Bronze' });

			const newPlayer = {
				playerName: message.author.username,
				playerID: `${message.author.id}`,
				rank: bronzePlayerCount.length + 1,
			};

			//assigns 'Players' role.
			if (message.channel.type == 1) {
				//DM
				const bronzeDivision = await myGuild.roles.cache.find(
					(role) => role.name === 'Bronze'
				);
				const playersRole = await myGuild.roles.cache.find(
					(role) => role.name === 'Players'
				);

				let newGuy = await myGuild.members.fetch(message.author.id);
				await newGuy.roles.add(playersRole);
				await newGuy.roles.add(bronzeDivision);
			} else {
				//CHANNEL
				const bronzeDivision = await message.guild.roles.cache.find(
					(role) => role.name === 'Bronze'
				);

				const playersRole = await message.guild.roles.cache.find(
					(role) => role.name === 'Players'
				);

				await message.member.roles.add(bronzeDivision);
				await message.member.roles.add(playersRole);
			}

			await Players.create(newPlayer);

			const someGuy = await myGuild.members.fetch(message.author.id);
			someGuy.send(
				`Welcome to Discord Fight League, ${message.author.username}! Please visit our website, https://www.discordfightleague.com/howtoplay, for more information on how to start competing!`
			);
			return await warRoom.send(
				`Welcome to Discord Fight League <@${message.author.id}>`
			);
		} catch (err) {
			console.error(err.message);
			return await message.channel.send(
				`Database error for !${this.name} command.  Please check to see if you are already a member. If not, please contact an Admin.`
			);
		}
	},
};

//message.channel.type: 1 for dm
//message.channel.type: 0 for chat
