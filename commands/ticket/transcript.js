const sourcebin = require('sourcebin_js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "save",
  aliases: [],
  description: "save",
  usage: "transcript",
  run: async (client, message, args) => {
      message.delete();
    let transcript = client.channels.cache.get('855442881325301800')
    if (!transcript) return message.channel.send("תיצור חדר הצעות");
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
    if (channel.name.includes('ticket-')) {
        if (message.member.hasPermission('SEND_MESSAGES') || channel.name === `ticket-${message.author.id}`) {
            channel.messages.fetch().then(async (messages) => {
                const output = messages.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

                let response;
                try {
                    response = await sourcebin.create([
                        {
                            name: ' ',
                            content: output,
                            languageId: 'text',
                        },
                    ], {
                        title: `Chat transcript for ${channel.name}`,
                        description: ' ',
                    });
                }
                catch(e) {
                    return message.channel.send('An error occurred, please try again!');
                }

                const embed = new MessageEmbed()
                    .setDescription(`[\`📄 View ticket\`](${response.url}) ticket-${message.author.tag}`)
                    .setColor('GREEN');
                    message.channel.send(`Save a ticket ${transcript}`)
                transcript.send('the transcript is complete. Please click the link below to view the transcript', embed);
            });
        }
    }
}
}