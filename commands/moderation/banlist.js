const { MessageEmbed } = require('discord.js');
const discord = require('discord.js');

module.exports = {
  name: "banlist",
  aliases: [],
  description: "Send A banlist!",
  usage: "banlist",
  run: async (client, message, args) => {
    let CommandChannel = client.channels.cache.get('872982584148242476')
    if (!CommandChannel) return message.channel.send("תיצור חדר הצעות");
    if(!message.member.hasPermission("BAN_MEMBERS")) return;
    var amount = 1;
    const fetchBans = message.guild.fetchBans();
    const bannedMembers = (await fetchBans)
    .map((member) => `> __${amount++}.__ **${member.user.tag}** | (*${member.user.id}*)`)
    .join("\n");
    const bansEmbed = new discord.MessageEmbed()
    .setAuthor(`Bans for ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
    .setDescription(`${bannedMembers}`)
    .setFooter(`Amount: ${amount - 1}`)
    .setTimestamp()
    .setColor("RED")
    message.lineReply(bansEmbed)
  }
};