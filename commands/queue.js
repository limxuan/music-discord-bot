/* eslint-disable no-undef */
module.exports = {
	name : "queue",
	description: "check current queue!",
	aliases : ["q"],
	ussage : null,
	hidden : false,
	canDisabled : true,
	admin : false,
	owner : false,
	nsfw : false,
	async execute(client,message){
		var msg = message;
		var utils = client.util;
		var serverQueue = client.queue.get(msg.guild.id);

		if (!serverQueue) return msg.channel.send("There is nothing playing.");
		var songs = [...serverQueue.songs];
		songs.shift();
		return msg.channel.send(`
__**Song Queue**__
${songs.map((song,i) => `**\`${utils.addZero(i+1)}\`** ${song.title}`).join("\n")}
**Now Playing: \`${serverQueue.songs[0].title}\`**
		`);
	}
}

