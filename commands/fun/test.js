const Discord = require('discord.js');
const { MessageButton, MessageActionRow } = require("discord-buttons");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: `adir`,
    aliases: [`adir`],
    description: "verifysystem",
    usage: "!verifysystem",
    run: async (client, message, args) => {
    const embed = new MessageEmbed()
        .setTitle('Verify System')
        .setURL('https://xxx.com')
        .setDescription('על מנת לקבל רול של ממבר תרשום בצאט **!verify**')
        .setColor('BLUE')
        .setFooter('Prime-RP')
    message.channel.send(embed)
    }
}