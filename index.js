const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
require('discord-buttons')(client);
client.db = require("quick.db");
require('discord-reply');
const { MessageAttachment } = require('discord.js');
const logger = require("discordjs-logger");

logger.all(client);
const DisTube = require('distube')

client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
	))
	.on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
client.on("ready", async () => {
  console.log(`Yo boii!! Moderation.V1 has been deployed!! Coded by 365 ɢᴀᴍɪɴɢ ɴ ᴍᴏʀᴇ_2.0#6766`);
  client.user
    .setActivity(`!help | Prime-RP`, { type: "LISTENING" })
    .catch(error => console.log(error));
});

client.on("message", async message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>`))) {
    return message.lineReply(`Hello My Prefix : ${Prefix}`);
  }
});

let modules = ["fun", "info", "moderation", "music", "ticket"];

modules.forEach(function(module) {
  fs.readdir(`./commands/${module}`, function(err, files) {
    if (err)
      return new Error(
        "Missing Folder Of Commands! Example : Commands/<Folder>/<Command>.js"
      );
    files.forEach(function(file) {
      if (!file.endsWith(".js")) return;
      let command = require(`./commands/${module}/${file}`);
      console.log(`:() ${command.name} | Command Loaded - ✅`);
      if (command.name) client.commands.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach(alias =>
          client.aliases.set(alias, command.name)
        );
      }
      if (command.aliases === 0) command.aliases = null;
    });
  });
});

client.on("message", async message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member)


    message.member = await message.guild.fetchMember(message);

  if (!message.content.startsWith('', Prefix)) return;
  let link = ["discord.gg/", "https://discord.gg/", ".gg/", "https://", "http://", "discord.gg"]

  if (link.some(word => message.content.toLowerCase().includes(word))) {
      await message.delete();
      return message.channel.send("אסור לשלוח פה קישורים!!")
          .then(m => m.delete({ timeout: 5000 }))
  }

  const args = message.content
    .slice(Prefix.length)
    .trim()
    .split(" ");
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (!command) return;

  if (command) {
    if (!message.guild.me.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "I Don't Have Enough Permission To Use This Or Any Of My Commands | Require : Administrator"
      );
    command.run(client, message, args);
  }
  console.log(
    `User : ${message.author.tag} (${message.author.id}) Server : ${message.guild.name} (${message.guild.id}) Command : ${command.name}`
  );
});


client.on('guildMemberAdd', async (user, guild) => {
  if (user.guild.id !== '855440456283455578') return;

  let channel = client.channels.cache.get('872681839771418624') // Welcome channel id here

  let base = "https://luminabot.xyz/api/image/welcomecard2?"
  let image = base + `avatar=${user.user.displayAvatarURL({ dynamic: false, format: 'png' })}&username=${user.user.username}&membercount=${user.guild.memberCount}&guildname=${user.guild.name}`
  
  let att = new MessageAttachment(image, 'welcome.png')

  channel.send(att)
})



client.login("ODc0MTk1MzM5Njk4MTMwOTg1.YRDb2g.w7FeaqoU2e8X20wCuEfi6AgNN7o");

//Bot Coded by 365 ɢᴀᴍɪɴɢ ɴ ᴍᴏʀᴇ_2.0#6766 DONOT share WITHOUT credits!!n