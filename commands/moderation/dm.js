const Discord = require('discord.js');
const bot = new Discord.Client();
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: `dm`,
    aliases: [`dm`],
    run: async function(client, message, args) {
        let CommandChannel = client.channels.cache.get('872982584148242476')
        if (!CommandChannel) return message.channel.send("תיצור חדר הצעות");
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.lineReply("❌Error: אין לך גישה לבצע פקודה זו!");


        let user =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]);
        if (!user)
            return message.lineReply(
                `You did not mention a user, or you gave an invalid id`
            );
        if (!args.slice(1).join(" "))
            return message.lineReply("You did not specify your message");
        user.user
            .send(args.slice(1).join(" "))
            message.lineReply("That user could not be DMed!")
            .then(msg => {
                setTimeout(() => msg.delete(), 5000)
            })
            .catch( /*Your Error handling if the Message isn't returned, sent, etc.*/ );

        message.reply(`Sent a message to ${user.user.tag}`)
            .then(msg => {
                setTimeout(() => msg.delete(), 10000)
            })
            .catch( /*Your Error handling if the Message isn't returned, sent, etc.*/ );
    }

}