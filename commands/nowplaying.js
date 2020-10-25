/* eslint-disable no-undef */
module.exports = {
	name : "nowplaying",
	description: "check Nowplaying Audio!",
	aliases : ["np"],
	ussage : null,
	hidden : false,
	canDisabled : true,
	admin : false,
	owner : false,
	nsfw : false,
	async execute(client,message){
		var msg = message;
		var serverQueue = client.queue.get(msg.guild.id);

		if (!serverQueue) return msg.channel.send("There is nothing playing.");
		return msg.channel.send(`🎶  **|**  Now Playing: **\`${serverQueue.songs[0].title}\`**`);
	}
}