const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: `simp`,
    aliases: [`simp`],
    run: async function(client, message, args) {
        let CommandChannel = client.channels.cache.get('875724390468288512')
        if (!CommandChannel) return message.channel.send("תיצור חדר הצעות");
        let user = message.mentions.users.first() || message.author;
        const rate = Math.floor(Math.random() * (100 - 1 + 1) + 1);

        if(user == message.author) {
            const Embed1 = new MessageEmbed()
            .setDescription(`You are **${rate}**% simp `)
            .setFooter(`${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(Embed1)

        } else {
            const Embed2 = new MessageEmbed()
            .setDescription(`${user} is ${rate}% simp `)
            .setColor('#00000')
            .setFooter(`${user.tag}`,
            user.displayAvatarURL({ dynamic: true })
            )
            message.lineReply(Embed2)
        }
    }
}