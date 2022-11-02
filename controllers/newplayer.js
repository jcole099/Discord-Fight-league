const Players = require('../models/Players');
module.exports = {
	name: 'newplayer',
	description: 'Creates a new player',
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
			const newPlayer = {
				playerName: message.author.username,
				playerID: message.author.id,
			};

			//assigns 'Players' role.
			if (message.channel.type == 1) {
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
