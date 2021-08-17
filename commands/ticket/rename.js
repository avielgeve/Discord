
module.exports = {
  name: "rename",
  aliases: [],
  description: "rename A ticket!",
  usage: "rename <name>",
  run: async (client, message, args) => {
    if(message.channel.name.includes('ticket-')) {
        const setname = args.join(" ");
        message.channel.setName(`${setname}`);
  message.lineReply(`Name change is ${setname}`);
    } return message.channel.send('You dont have ticket opened');
}
}