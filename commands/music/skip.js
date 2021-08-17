const { MessageEmbed } = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
  name: "skip",
  aliases: [],
  description: "Skip A Music!",
  usage: "skip",
  run: async (client, message, args) => {
    let Musicchannel = client.channels.cache.get('872982584148242476')
    if (!Musicchannel) return message.channel.send("תיצור חדר הצעות");
    if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');

    const queue = await client.distube.getQueue(message);
    if(queue) {
        client.distube.skip(message)

        message.lineReply('Skipped!')
    } else if (!queue) {
        return
    };
    
    }
}