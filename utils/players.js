/* eslint-disable no-undef */
// init
const {Util} = require("discord.js");
const ytdl = require("ytdl-core");



module.exports = {
	"name":"players",
	"handleVideo" : async (client, video, msg, voiceChannel, playlist=false, type) => {
		var queue = client.queue;
		const serverQueue = queue.get(msg.guild.id);
		const song = type !== "Radio"? {
			id : video.id,
			title : Util.escapeMarkdown(video.title),
			url : `https://<www class="youtu"></www>be.com/watch?v=${video.id}`,
            type : "YT"
		}
        : {
            id : video.id,
            title : Util.escapeMarkdown(video.title),
            url : video.url,
            type : "Radio"
        };
		if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 100,
            playing: true,
            loop: false
        };
        await queue.set(msg.guild.id, queueConstruct);

        queueConstruct.songs.push(song);
		
		try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            client.players.play(client,msg.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            queue.delete(msg.guild.id);
            return msg.channel.send(`I could not join the voice channel: **\`${error}\`**`);
        }
		} else {
			serverQueue.songs.push(song);
            if (playlist) return;
            else return msg.channel.send(`<:yes:591629527571234819>  **|** **\`${song.title}\`** has been added to the queue!`);
		}
	},
	"play" : async (client, guild, song) => {
        const queue = client.queue
        const serverQueue = queue.get(guild.id);

        if (!song) {
            // this dude make me leave if queue was empty
            serverQueue.voiceChannel.leave();
            return queue.delete(guild.id);
        }

        var stream = song.type !== "Radio"? ytdl(song.url) : song.url;

        const dispatcher = serverQueue.connection.play(stream)
            .on("finish", () => {
                const shiffed = serverQueue.songs.shift();
                if (serverQueue.loop === true) {
                    serverQueue.songs.push(shiffed);
                }
                client.players.play(client, guild, serverQueue.songs[0]);
            })
            .on("error", error => console.error(error));
        dispatcher.setVolume(serverQueue.volume / 100);

        serverQueue.textChannel.send({
            embed: {
                color: "RANDOM",
                description: `🎶  **|**  Start Playing: **\`${song.title}\`**`
            }
        });
    }
}