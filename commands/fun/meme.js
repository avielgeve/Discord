const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");
const fetch = require("node-fetch");

module.exports = {
  name: "meme",
  aliases: [],
  description: "Send A Meme!",
  usage: "Meme",
  run: async (client, message, args) => {
    let CommandChannel = client.channels.cache.get('875724390468288512')
    if (!CommandChannel) return message.channel.send("תיצור חדר הצעות");
    message.delete();
    fetch("https://meme-api.herokuapp.com/gimme")
      .then(res => res.json())
      .then(json => {
        let embed = new MessageEmbed()
          .setColor(Color)
          .setTitle(`${json.title}`)
          .setURL(json.postLink)
          .setImage(json.url)
          .setFooter(`From /r/${json.subreddit}`);

          message.lineReply(embed);
      });
  }
};