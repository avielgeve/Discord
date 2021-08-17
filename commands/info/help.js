const Discord = require('discord.js');
const disbut = require('discord-buttons');
const { MessageActionRow, MessageButton } = require("discord-buttons");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Help Command!",
  usage: "Help | <Command Name>",
  run: async(client, message, args) => {
		let CommandChannel = client.channels.cache.get('872982584148242476')
        if (!CommandChannel) return message.channel.send("תיצור חדר הצעות");
		const embed = new Discord.MessageEmbed()
		.setTitle('Help System')
    .setColor('RED')
		.setDescription(`Click the buttons below to click the help menu!`)
    .setFooter('Prime-RP Bot ❤')
		.setTimestamp()
		.setThumbnail('https://cdn.discordapp.com/attachments/849998658513403964/875716954659360828/PrimeRPLogo.png');
	
		const embed1 = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setDescription(`Basic Commands!`);
	
		const embed2 = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setTitle('Prefix: !')
		.setFooter('Help System ✅')
		.addFields(
			{
			  name: "Music Commands",
			  value: ' `play` `stop` `skip` ',
			}
		  )
		.setTimestamp()
		.setAuthor(message.author.tag, message.author.displayAvatarURL({ dyanmic: true }));
	
		const embed3 = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setTitle('Prefix: !')
		.setFooter('Help System ✅')
		.addFields(
			{
			  name: "Member Commands",
			  value: ' `ping` `stats` `simp` `ytt` `calculator` `avatar` `suggest` `invites` `howgay` `meme` `userinfo` `ascii` `randomnumber` `coinflip`',
			}
		  )
		.setTimestamp()
		.setAuthor(message.author.tag, message.author.displayAvatarURL({ dyanmic: true }));
	
		const embed4 = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setTitle('Prefix: !')
		.setFooter('Help System ✅')
		.addFields(
			{
			  name: "Admin Commands",
			  value: ' `kvoice` `say` `warn` `warnings` `kick` `ban` `unban`  `mute` `unmute` | `banlist` `clear` `dm` ',
			},
			{
				name: "Staff Ticket Commands",
				value: ' `add` `rename` `save` '
			}
		  )
		.setTimestamp()
		.setAuthor(message.author.tag, message.author.displayAvatarURL({ dyanmic: true }));
	
		//--------------------EMBEDS------------------------
	
		//--------------------Buttons------------------------
	
		let button1 = new MessageButton()
		.setLabel(`Basic Commands`) //no
		.setID(`help1`)
		.setEmoji(`🎈`)
		.setStyle("green");
	
		let button2 = new MessageButton()
		.setLabel(`Music Commands`)
		.setID(`help2`)
		.setEmoji(`🎭`)
		.setStyle("green");
	
		let button3 = new MessageButton()
		.setLabel(`Admin Commands`)
		.setID(`help3`)
		.setEmoji(`⚙`)
		.setStyle("green");


		let button4 = new MessageButton()
		.setLabel(`Members Commands`)
		.setID(`help4`)
		.setEmoji(`🔐`)
		.setStyle("green")
		if(!message.member.roles.cache.has("872982583242289225")) button3.setDisabled(true);
	
		let row = new MessageActionRow()
		.addComponents(button2, button3, button4);
	
		//--------------------Buttons------------------------
	
		const MESSAGE = await message.channel.send(embed, row);

		const filter = ( button ) => button.clicker.user.id === message.author.id 
		const collector = MESSAGE.createButtonCollector(filter, { time : 120000 });
	
		collector.on('collect', async (b) => {
	
			if(b.id == "help2") {
				
				MESSAGE.edit(embed2, row);
				await b.reply.defer()
	
			}
	
			if(b.id == "help3") {
				
				MESSAGE.edit(embed4, row);
				await b.reply.defer()
	
			}
	
			if(b.id == "help4") {
				
				MESSAGE.edit(embed3, row);
				await b.reply.defer()
	
			}
	
	
		})
	
		collector.on('end', (b) => {
			MESSAGE.edit(`This help menu is expired! Type the command again to view.`)
		})
  }
};
