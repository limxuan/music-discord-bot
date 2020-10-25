/* eslint-disable no-undef */
module.exports = {
	name : "remove",
	description: "remove specific queue!",
	aliases : ["rm"],
	ussage : "[ list-index ]",
	hidden : false,
	canDisabled : true,
	admin : false,
	owner : false,
	nsfw : false,
	async execute(client,message,args){
        if(!args[0]) return message.reply("please provide the index to remove!")
        var num = parseInt(args[0]);
		var msg = message;
		var serverQueue = client.queue.get(msg.guild.id);
		if (!msg.member.voice.channel ) return msg.channel.send("I'm sorry but you need to be in a voice channel to play a music!");
		var guildvoice = client.voice.connections.get(message.guild.id);
		if(!guildvoice) return message.reply("please letme join to room!")
		if (serverQueue) {
            if(!serverQueue.songs) return message.reply("No songs on queue!")
            if(num <= 0 || num > serverQueue.songs.length) return msg.reply("Out of range!");
            var rmm = serverQueue.songs[num];
            serverQueue.songs.splice(num,1);
            return msg.channel.send(`❌ **|** Success remove \`${rmm.title}\`!`);
        }
        return msg.channel.send("There is no queue rn");
	}
}



