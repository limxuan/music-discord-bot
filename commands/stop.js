/* eslint-disable no-undef */
module.exports = {
	name : "stop",
	description: "stop nowplaying audio",
	aliases : ["st","disconnect","dc"],
	ussage : null,
	hidden : false,
	canDisabled : true,
	admin : false,
	owner : false,
	nsfw : false,
	async execute(client,message){
		var msg = message;
		var serverQueue = client.queue.get(msg.guild.id);
		
		if (!msg.member.voice.channel) return msg.channel.send("I'm sorry but you need to be in a voice channel to play music!");
		var guildvoice = client.voice.connections.get(message.guild.id);
		if(!guildvoice) return message.reply("please letme join to room!")
		if(guildvoice.channel.id !== msg.member.voice.channel.id) return message.reply("dont disturb me!")
		if (!serverQueue) return msg.channel.send("There is nothing playing that I could **`stop`** for you.");
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end("Stop command has been used!");
		return msg.channel.send("⏹️  **|**  Stop command has been used!");
	}
}