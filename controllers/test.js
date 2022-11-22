module.exports = {
	name: 'test',
	description: 'Used for misc. testing',
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
            // const someGuy = await myGuild.members.fetch(message.author.id);
            // const playersRole = await myGuild.roles.cache.find(
            //     (role) => role.name === 'Players'
            // );

            // //HOW TO FIND OUT IF A USER HAS A ROLE:
            // if (await someGuy.roles.cache.find(role => role.name === 'Admin')) {
            //     console.log('USER HAS ADMIN ROLE')
            // } else {
            //     console.log('USER DOES NOT HAVE ADMIN')
            // }
            // console.log(playersRole)
			if (message.channel.id === process.env.DISCORD_ADMINROOMID) {
				message.channel.send('yay! admin room')
			} else {
				message.channel.send('booo! some other room')

			}
			console.log(message.channel.id);

			// if (command.restriction === 'admin' && message.channel.type !== 'dm') {
			// 	if (!message.member.roles.cache.some((r) => r.name === 'Admin')) {
			// 	return message.author.send(
			// 		`You don't have appropriate permission to use that command, ${message.author}`
			// 	);
			// 	}
			// } else if (command.restriction === 'admin' && message.channel.type === 'dm') {
			// 	return message.channel.send(
			// 	`Admin commands are not allowed in private chat, ${message.author}`
			// 	);
			// }
        } catch (err) {
            console.log(err)
        }
	},
};
