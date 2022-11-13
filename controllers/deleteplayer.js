const Players = require('../models/Players');
const buildRanksHelper = require('../helpers/buildRanksHelper');

module.exports = {
	name: 'deleteplayer',
	description:
		'Removes a player from the league. All betting history will be permanently erased.',
	restriction: '',
	dm: false,
	args: 1,
	usage: '<player_id>',
	async execute(
		message,
		args,
		freezeBets,
		commands,
		myGuild,
		warRoom,
		adminRoom
	) {
		if (isNaN(args[0])) {
			return message.channel.send(
				`Please ensure that the player ID is a valid number`
			);
		}
		try {
			//check if player exists
			const userData = await Players.findOne({ playerID: args[0] });
			if (userData == null) {
				return message.channel.send(
					"Player with that ID doesn't exist in the database"
				);
			}

			//Remove roles
			const someGuy = await myGuild.members.fetch(args[0]);
			const allRoles = await message.guild.roles.cache;
			await someGuy.roles.remove(allRoles);

			//delete data
			await Players.deleteOne({ playerID: args[0] });
			let reply = '**Player removed**\n\n';
			reply += `Player ID: ${userData.playerID}\nPlayer Name: ${userData.playerName}`;

			// Rerank division
			buildRanksHelper(userData.division);

			return message.channel.send(reply);
		} catch (err) {
			console.log(err);
			return message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
