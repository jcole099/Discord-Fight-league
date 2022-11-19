const Players = require('../models/Players');

module.exports = {
	name: 'strikestatus',
	description: "Checks if the player has a strike",
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
			const userData = await Players.find({ playerID: message.author.id });
            let reply = ``
            if (userData[0].strike) {
                reply = `**You currently have a strike**.\nThe strike will be erased at the end of the season.`
            } else {
                reply = `You do not have a strike.`
            }

			message.channel.send(reply);
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};