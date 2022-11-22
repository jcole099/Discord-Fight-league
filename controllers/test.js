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
            const someGuy = await myGuild.members.fetch(message.author.id);
            const playersRole = await myGuild.roles.cache.find(
                (role) => role.name === 'Players'
            );

            //HOW TO FIND OUT IF A USER HAS A ROLE:
            if (await someGuy.roles.cache.find(role => role.name === 'Admin')) {
                console.log('USER HAS ADMIN ROLE')
            } else {
                console.log('USER DOES NOT HAVE ADMIN')
            }
            // console.log(playersRole)
        } catch (err) {
            console.log(err)
        }
	},
};
