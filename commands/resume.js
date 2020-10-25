/* eslint-disable no-undef */
module.exports = {
	name : "resume",
	description: "resume current Audio!",
	aliases : ["resum","rs"],
	ussage : null,
	hidden : false,
	canDisabled : true,
	admin : false,
	owner : false,
	nsfw : false,
	async execute(client,message){
		var msg = message;
		var serverQueue = client.queue.get(msg.guild.id);

		var guildvoice = client.voice.connections.get(message.guild.id);
		if(!guildvoice) return message.reply("please letme join to room!")
		if(guildvoice.channel.id !== msg.member.voice.channel.id) return message.reply("dont disturb me!")

		if (serverQueue && !serverQueue.playing) {
				serverQueue.playing = true;
				serverQueue.connection.dispatcher.resume();
				return msg.channel.send("▶  **|**  Resumed the music for you!");
		}
		return msg.channel.send("There is nothing playing.");
	}
}