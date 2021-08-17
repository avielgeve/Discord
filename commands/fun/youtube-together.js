const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch')
const {MessageButton} = require('discord-buttons')

module.exports = {
  name: "ytt",
  aliases: [],
  description: "Youtube In Screen",
  usage: "ytt <Text>",
  run: async (client, message, args) => {
    let CommandChannel = client.channels.cache.get('872982584148242476')
    if (!CommandChannel) return message.channel.send("תיצור חדר הצעות");
    const channel = message.member.voice.channel

    if (!channel) return message.channel.send(
        new MessageEmbed()
            .setTitle("You must be connected to a voice channel to use this command!")
            .setColor("RED")
    )

    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "755600276941176913",
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(invite => {
        if (!invite.code) return message.channel.send(
            new MessageEmbed()
                .setTitle("I was unable to start a yt together session! *pain*")
                .setColor("RED")
        )
        const ytt = new MessageButton()
.setStyle("url")
.setLabel('Youtube Together')
.setEmoji("870909668090851399")
.setURL(`https://discord.com/invite/${invite.code}`)

CommandChannel.send({
    buttons: [ytt],
    embed: new MessageEmbed()
    .setTitle('Youtube Together')
    .setDescription('Click the button below to watch youtube in vc')
})
    })
  }
};