const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: `say`,
    aliases: [`say`],
    run: async function(client, message, args) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return channel.reply("❌Error: אין לך גישה לבצע פקודה זו!");
        message.delete()
        const sayEmbed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dyanmic: true }))
            .setDescription(args.join(" "))
            .setTimestamp()
            .setColor("RANDOM")
            .setFooter('Prime-RP | Bot', 'https://cdn.discordapp.com/attachments/849998658513403964/875716954659360828/PrimeRPLogo.png')

        message.channel.send(sayEmbed)
    },
};