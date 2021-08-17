module.exports = {
    name: `stop`,
    aliases: [`stop`],
    run: async function(client, message, args) {
        let Musicchannel = client.channels.cache.get('872982584148242476')
        if (!Musicchannel) return message.channel.send("תיצור חדר הצעות");
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');
  
        let queue = await client.distube.getQueue(message);
    
        if(queue) {
          client.distube.stop(message)
    
          Musicchannel.send('DONE!')
        } else if (!queue) {
            return
        };
    
    }
}