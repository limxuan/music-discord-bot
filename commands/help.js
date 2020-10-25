const Discord = require('discord.js');
const fs = require("fs");
const prefix = require('../config.json').prefix;
const owner = require('../config.json').ownerID;


//Modue Export
module.exports = {
  name: "help",
  description: "Display Help commands!",
  aliases: ["h"],
	ussage: "< Command >",
	canDisabled : false,
  hidden: false,
  admin:false,
  owner:false,
	nsfw : false,
  async execute(client,message,args) {
      const utils = client.util;
			const colors = client.colors;
      var footer = `copyright ${client.users.cache.get(owner).tag}`;

      if(args[0]){
        var cmd = client.commands.get(args[0]);
        if(!cmd) return message.reply("cant find command like this!").then(msg => msg.delete(5000));
        var cm = [];
        cm.push(`Description : \`\`${cmd.description}\`\``)
        if(cmd.aliases) cm.push(`Aliases : \`\`${cmd.aliases}\`\``);
        if(cmd.ussage) cm.push(`usage : \`\`${prefix+cmd.name+" "+cmd.ussage}\`\``);

        var embed = new Discord.MessageEmbed()
          .setTitle(`**${cmd.name}** help command`)
          .setDescription(`${cm.join("\n")}\n\n\`\`[ ] refer to required args\`\`\n\`\`< > refer to optional args\`\``)
          .setColor(colors.accent)
          .setFooter(footer);

          return message.channel.send(embed);

      } else {
        var cmds = fs.readdirSync("./commands").filter(file => file.endsWith('.js')),
            cm = cmds.map(e=>{
              var cmd = require(`../commands/${e}`);
              if(!cmd.hidden){
                return `\`\`${utils.tn(cmd.name,2)} :\`\` ${cmd.description}`
              }
              return null;
            });

        var embed = new Discord.MessageEmbed()
          .setTitle(`${client.user.username} Help commands`)
          .setDescription(`my prefix is \`${prefix}\`\n`+cm.filter(e=>{return e !== null}).join("\n"))
          .setColor(colors.accent)
          .setFooter(footer);

          return message.channel.send(embed);
      }
  }
}