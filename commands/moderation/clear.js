const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "clear",
  aliases: ["purge", "clearmsgs"],
  description: "Clear Your Messages!",
  usage: "Clear <Message Amount>",
  run: async (client, message, args) => {
    try {
      let amount = Number(args[0], 10) || parseInt(args[0]);
      if (isNaN(amount) || !Number.isInteger(amount))
        return message.lineReply(
          "Please enter a number of messages to purge."
        )
      if (!amount || amount < 2 || amount > 100)
        return message.lineReply(
          "Please enter a number of message between 2 and 100."
        );
      if (!args[1]) {
        try {
          await message.delete();
          await message.channel.bulkDelete(amount).then(async (m) => {
            let embed = new MessageEmbed()
              .setColor("0x#00ffff")
              .setDescription(
                `✅  Cleared **${m.size}**/**${amount}** messages!`
              );

            message.lineReply(embed)
              .then((msg) => msg.delete({ timeout: 5000 }));
          });
        } catch (e) {
          message.lineReply.send(
            `You can only delete the messages which are not older than 14 days!`
          );
        
        }
      } else {
        return message.lineReply.send(`An error occoured.`);
      }
    } catch (error) {
      console.log(error);
      message.lineReply.send(`An error occurred: \`${error}\``);
    }
  }
};