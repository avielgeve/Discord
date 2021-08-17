const { MessageEmbed } = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');
const tranascript = require('discord-transcript');
const Discord = require("discord.js");
module.exports = {
  name: "send-ticket",
  aliases: [],
  description: "tickert A tickert!",
  usage: "tickert <name tickert>",
  run: async (client, message, args) => {
    message.delete();

    const embed = new MessageEmbed()
    .setTitle('Ticket System')
    .setTimestamp()
    .setThumbnail('https://cdn.discordapp.com/attachments/849998658513403964/875716954659360828/PrimeRPLogo.png')
    .setDescription(`שלום לך, במידה ואתה צריך עזרה כלשהו תוכל ללחוץ על פתיחת טיקט ותוכל לקבל עזרה מאיש צוות של השרת.`)
    .setFooter(`SYSTEM TICKET | PRIME-RP | BOT | 🎈`)
    .setColor('RANDOM');


    const ticketcreate = new MessageButton()
    .setStyle('grey')
    .setLabel('Create Ticket')
    .setID('ticketcreate')
    .setEmoji('📥');
    
    const ticketclose = new MessageButton()
    .setStyle('grey')
    .setLabel('Close Ticket')
    .setID('ticketclose')
    .setEmoji('🔒');

    const row = new MessageActionRow()
    .addComponent(ticketcreate);

    const row2 = new MessageActionRow()
    .addComponent(ticketclose);
    message.channel.send({
        components: [row],
        embed: embed
    })
    client.on('clickButton', async(button) => {
        if (button.id === 'ticketcreate') {
          button.reply.send(`פתחת טיקט גש אליו.`, true)
          let buttonMember = button.clicker.member;
         return button.message.guild.channels.create(`ticket-${message.author.tag}`, {
            parent: '855442864254091305',
            permissionOverwrites: [
                {
                    'id': button.message.guild.roles.everyone.id,
                    'deny': ['VIEW_CHANNEL']
                },
                {
                    'id': buttonMember.id,
                    'allow': ['VIEW_CHANNEL', 'SEND_MESSAGES']
                }
            ]
        }).then(channel => {
            embed.setDescription(
                'You have opened a ticket! ' +
                'Please state your issue,\n' +
                'a staff member will soon be in touch!'
            );
            const roleId = message.guild.roles.cache.get("869288348789907527");
            channel.send(`Welcome ${buttonMember}, Please wait a support team ${roleId}`).then(() => channel.send({
              components: [row2],
              embed: embed
            }));
        }
        
      
        )} else if (button.id === 'ticketclose') {
          button.channel.setName('closed-ticket')
          button.reply.send(`Ticket close a 5 second`, true)
          setTimeout(() => {
            if(!button.channel.deleted) button.channel.delete()
          }, 5000);
        }
        }
    )}
}