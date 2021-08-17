const Discord = require('discord.js');
const { MessageButton, MessageActionRow } = require("discord-buttons");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: `verifysystem`,
    aliases: [`verifysystem`],
    description: "verifysystem",
    usage: "!verifysystem",
    run: async (client, message, args) => {
      if (!message.member.hasPermission("ADMINISTATOR")) return channel.reply("❌Error: אין לך גישה לבצע פקודה זו!");
        message.delete()
    
      const embed = new Discord.MessageEmbed()
      .setTitle("Verify System")
      .setColor("GREEN")
      .setDescription("נא לעבור על החוקים, מקווים שתהנו בשרת.\n`לחץ על הווריפי כדי לקבל רול של ממבר המשך יום נעים`")
      .setFooter('Prime-RP | Bot ❤', 'https://cdn.discordapp.com/attachments/849998658513403964/875716954659360828/PrimeRPLogo.png')
      .setThumbnail('https://cdn.discordapp.com/attachments/849998658513403964/875716954659360828/PrimeRPLogo.png')
    
    const add = new MessageButton()
    .setStyle("green")
    .setLabel("Click Verify")
    .setID("AddRole")
    .setEmoji("✅")

    const link = new MessageButton()
    .setStyle('gray')
    .setID('urls')
    .setLabel('קישור הזמנה לשרת.')

    const row = new MessageActionRow()
    .addComponents([add, link])
  

    client.on('clickButton', async (button) => {
      if(button.id === 'AddRole') {
        button.reply.send(`You get the member role!`, true)
        const role = button.guild.roles.cache.get('872982583154204689')
      const member = button.clicker.member
      member.roles.add(role)
      } else if(button.id === 'urls') {
        button.reply.send(`https://discord.gg/DzjcY69qZ3`, true)
      }
    })
    message.channel.send({
      embed: embed,
      component: row
    })
    
    }
}