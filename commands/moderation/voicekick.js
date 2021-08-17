const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { stripIndent } = require('common-tags');

module.exports = {
  name: "vkick",
  aliases: [],
  description: "Voice Kick A Member!",
  usage: "vkick <Mention Member>",
  run: async (client, message, args) => {
    message.delete()
    if (!message.guild.me.hasPermission(["ADMINISTRATOR"]))
      return message.lineReply(
        "Invalid perms to run command"
      );
  if (!message.member.hasPermission(["MOVE_MEMBERS"])) return message.lineReply("You cannot use this command due to invalid perms");

    let user = message.mentions.members.first()

    if (!user)
      return message.lineReply(
        `Please mention user to kick from VC`
      );
      
   
    let { channel } = user.voice;

    if (!channel) return message.lineReply(`User Is Not In Any Voice Channel!`);

    user.voice.kick();
    
    message.lineReply(`${user.user.username} has been kicked from ${channel}`)
  }
};
