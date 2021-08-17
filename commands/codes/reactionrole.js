const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const discord = require('discord.js');
const { message } = require("noblox.js");
const Client = new Discord.Client();

module.exports = {
    name: `react`,
    aliases: [`react`],
    run: async function(client, message, args) {
        message.delete()
            // gets the role for the reaction
        let reactRole = message.mentions.roles.first()

        // create an embed
        const embed = new discord.MessageEmbed()
            .setColor("0080ff") // the color of the embed 
            .setDescription(`לחץ על האימוגי ✅ כדי לראות את שאר החדרים`) // desc of the embed

        // send the embed.
        let msg = await message.channel.send(embed)

        // reacts to the embed with an emoji
        await msg.react('✅')

        // filtering so it only works for the emoji choosen
        const reactionFilter = (reaction, user) => ["✅"].includes(reaction.emoji.name)

        // making a collection for the emoji
        const reactionCollector = msg.createReactionCollector(reactionFilter, { dispose: true })

        // setting the collection that when the reaction was removed
        reactionCollector.on("remove", (reaction, user) => {

            // if the bot removed their reaction return
            if (user.client) return;

            // getting the member of the server who reacted 
            let member = reaction.message.guild.members.cache.find(member => member.id === user.id)

            // remove the role when he/she remove his/her reaction.
            member.roles.remove(reactRole)
        })

        reactionCollector.on("collect", (reaction, user) => {

            // if a bot reacted return
            if (user.client) return;

            // getting the member of the server who reacted 
            let member = reaction.message.guild.members.cache.find(member => member.id === user.id)

            // adds the role to the member!
            const role = message.guild.roles.cache.get("855442744276549655");
            message.member.roles.add(role.id)
            message.reply('קיבלת ממבמר המשך יום נעים אח.')
                .then(msg => {
                    setTimeout(() => msg.delete(), 6000)
                })
                .catch( /*Your Error handling if the Message isn't returned, sent, etc.*/ );
        })
    }
}