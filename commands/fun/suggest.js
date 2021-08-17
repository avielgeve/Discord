const { MessageEmbed } = require("discord.js");

module.exports = {
    name: `suggest`,
    aliases: [`suggest`],
    description: "Ban A Member!",
    usage: "Ban <Mention Member>",
    run: async (client, message, args) => {
        message.delete()
        let suggestion = args.slice(0).join(" ");
        if (!description) return message.lineReply('תרשום בבקשה מה ההצעה.');
        let SuggestionChannel = client.channels.cache.get('875724390468288512')
        if (!SuggestionChannel) return message.channel.send("תיצור חדר הצעות");
        const embed = new MessageEmbed()
            .setTitle("הצעה חדשה")
            .setDescription(suggestion)
            .setColor("RANDOM")
            .setFooter(`${message.author.tag}`, 'https://cdn.discordapp.com/attachments/849998658513403964/875716954659360828/PrimeRPLogo.png')
            .setTimestamp()
        message.lineReply(embed).then(msg => {
            msg.react("👍🏼")
            msg.react("👎🏼")
        });
    }
}