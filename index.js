/* eslint-disable no-undef */
// init const
const Discord = require("discord.js");
const fs = require("fs");
const { token } = require('./config.json');
// eslint-disable-next-line no-undef
const { prefix } = require('./config.json');
// eslint-disable-next-line no-undef
const owner_id = require('./config.json').ownerID;

const BotClient = require("./structures/BotClient.js");
const client = new BotClient();
client.commands = new Discord.Collection();

// command load
const cmdir = './commands';
var commandFiles = fs.readdirSync(cmdir).filter(file => file.endsWith('.js'));

for (const file of commandFiles ) {
	const command = require(`${cmdir}/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
	console.log(`Loading: ${file} as ${command.name}`)
	// set if there aliase !== null
	// // with the key as the each of command aliases and the value as the exported module
	command.aliases.map(e=>{
		client.commands.set(e, command);
		console.log(`Loading: ${file} as ${e}`)
	})
}

// BOT event Handler
client.on("warn", console.warn);
client.on("error", console.error);
client.on("ready", () => {
	console.log(`${client.user.tag} Ready!!!`);
	// client.players.radioList();
	// webconfig
	require("./webserver.js").exec(client);
});
client.on("voiceStateUpdate", (mold, mnew) => {
	if( !mold.channelID) return;
	if( !mnew.channelID && client.user.id == mold.id ) {
		 const serverQueue = client.queue.get(mold.guild.id);
		 if(serverQueue)  client.queue.delete(mold.guild.id);
	} ;
})

client.on("message", message => {
	// prevent another bot do commands
	if(message.author.bot) return 

	// if people mention us, tell them about our prefix
	if(message.mentions.users.size){
		if(message.mentions.users.first().id == client.user.id){
			return message.reply(`my prefix is \`\`${prefix}\`\``)
		}
	}

	// if user message by DM
	if(message.guild == null){
		// doing nothing
		return;
	}

	// prevent bot account and message no prefix
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;
  
  

  
  try {
    const comid = client.commands.get(commandName);
    if( message.guild === null || comid.AnyChannel){
      // do somenting when message dome from DM
      return null;
    }else{
      // do nothing
    }
    if(comid.admin && owner_id !== message.author.id ){
      //control if the command is only for administrator
      if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.reply(`Just admin can access \`${comid.name}\` command!!!`).then(msg => msg.delete({timeout:5000}));
      }
    }

    if(comid.owner && owner_id !== message.author.id){
      return message.reply(`Just owner can access \`${comid.name}\` command!!!`).then(msg => msg.delete({timeout:5000}));
    }

		
    // only on nsfw channel
		if (comid.nsfw && !message.channel.nsfw) return message.reply("require NSFW channel! so can't run command!").then(msg => msg.delete({timeout:5000}));

    // execute command
    comid.execute(client, message, args);
    
    
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!").then(msg => msg.delete({timeout:5000}));
  }

})

// eslint-disable-next-line no-undef
client.login(token)

