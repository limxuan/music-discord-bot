/* eslint-disable no-undef */
module.exports = {
	name : "ping",
	description: "check BOT heartBeat",
	aliases : [],
	ussage : null,
	hidden : false,
	canDisabled : true,
	admin : false,
	owner : false,
	nsfw : false,
	async execute(client,message){
		const dt = new Date(message.createdTimestamp);
		message.channel.send(`🏓Pong \`${new Date() - dt}ms\`| ws : \`${client.ws.ping}ms\``).then(msg=>msg.delete({timeout:5000}));
	}
}