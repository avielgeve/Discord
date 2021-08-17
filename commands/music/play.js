const { MessageEmbed } = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
  name: "play",
  aliases: [],
  description: "Play A Music!",
  usage: "play <name song>",
  run: async (client, message, args) => {
    message.delete();
    let Musicchannel = client.channels.cache.get('872982584148242476')
    if (!Musicchannel) return message.channel.send("תיצור חדר הצעות");
    if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');

    const music = args.join(" ");

    const embed = new MessageEmbed()
    .setTitle('Music System')
    .setTimestamp()
    .setThumbnail('https://cdn.discordapp.com/attachments/849998658513403964/875716954659360828/PrimeRPLogo.png')
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dyanmic: true }))
    .setDescription(`**Play ${music}?**`)
    .setFooter(`By: Prime-RP ❤`)
    .setColor('RANDOM');


    const buttonplay = new MessageButton()
    .setStyle('green')
    .setLabel('Play')
    .setID('1')
    .setEmoji('▶');

    const buttonnone = new MessageButton()
    .setStyle('red')
    .setLabel('No')
    .setID('2')
    .setEmoji('⏸');
    const row = new MessageActionRow()
    .addComponents(buttonplay, buttonnone);
    message.channel.send({
        components: [row],
        embed: embed
    })
    client.on('clickButton', async(button) => {
        if (button.id === '1') { //play
          button.reply.send(`Music a playing now`, true)
            client.distube.play(message, music)
        } else if (button.id === '2') { //no
            Musicchannel.send(':(')
        }
    }
    )}
}