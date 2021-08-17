const { MessageEmbed, Message } = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');
module.exports = {
  name: "add",
  aliases: [],
  description: "add A member a ticket!",
  usage: "add <name/id>",
  run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
        if(!member) {
            return message.channel.send(`Incorrect Usage! Correct Usage:!add <member>`);
        }
        try{
            message.channel.updateOverwrite(member.user, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                READ_MESSAGE_HISTORY: true,
            }).then(() => {
                message.channel.send(`Successfully added ${member} to ${message.channel}`);
            });
        }
        catch(e) {
            return message.channel.send('An error occurred, please try again!');
        }
 }
}