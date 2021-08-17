const discord = require('discord.js'); // connecting to discord.js modules]
const Discord = require('discord.js');
const ms = require('ms'); // requiring the ms package
const Client = new Discord.Client();

module.exports = {
  name: "giveaway",
  aliases: [],
  description: "Giveaway Your Messages!",
  usage: "giveaway <name> <prize> <amount>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return channel.reply("❌Error: אין לך גישה לבצע פקודה זו!");

    // if no time said send this
    if (!args[0]) return message.channel.send(`**How long does the giveaway need to be?**`)

    // =giveaway 1h 1 tshirt / if the time doesn't end with h /s /d /m  send this 
    if (!args[0].endsWith("s") && !args[0].endsWith("h") && !args[0].endsWith("d") && !args[0].endsWith("m")) return message.channel.send(`**How long does the giveaway need to be?**`)

    // if the time said isnt a number
    if (isNaN(args[0][0])) return message.channel.send(`**How long does the giveaway need to be?**`)

    // winner count 
    let winnerCount = args[1]

    // getting the whole prize
    let prize = args.slice(2).join(" ")

    // if no amount of winner said
    if (!args[1]) return message.channel.send(`**How many people can win?**`)

    // if no prize said
    if (!args[2]) return message.channel.send(`**What is the prize for the giveaway?**`)

    // deleting the msg u send then...
    message.delete()

    // creating the giveaway embed
    var botEmbed = new discord.MessageEmbed()
        .setTitle("🎉 **GIVEAWAY** 🎉")
        .setDescription(`
     React with 🎉 to enter!
     **Giveaway Prize: **${prize}
     **Giveaway Winners: **${winnerCount}
     **Giveaway Ends: **${args[0]}
     **Giveaway Hosted By: **${message.author}`)
        .setTimestamp(`Ends on ${Date.now()+ms(args[0])}`)
        .setColor("#d98a23")

    // sending the giveaway embed
    var msg = await message.channel.send(botEmbed)

    // the bot with that emoji once it sends the embed
    msg.react('🎉')

    // setting the timeout of the giveaway
    setTimeout(function() {

        var random = 0;
        var winners = [];
        var inList = false;

        // getting all people who reacted
        var peopleReacted = msg.reactions.cache.get("🎉").users.cache.array();

        // removing the bot from reaction
        for (let i = 0; i < peopleReacted.length; i++) {

            if (peopleReacted[i] == Client.user) {
                peopleReacted.splice(i, 1);
                continue;
            }
        }

        // if no people entered the giveaway send this
        if (peopleReacted.length == 0) {
            var non = new discord.MessageEmbed()
                .setColor("#ff0000")
                .setTitle("🎉 **GIVEAWAY ENDS** 🎉")
                .setDescription(`There are no winners, because no one participated!
             
              **Giveaway Hosted By: **${message.author}`)
            msg.edit(non)

            return message.channel.send(`There are no winners, because no one practicipated! :(\n${msg.url}`)
        }

        // if the winner count is higher then the members who joined the giveaway
        if (peopleReacted.length < winnerCount) {
            var non = new discord.MessageEmbed()
                .setColor("#ff0000")
                .setTitle("🎉 **GIVEAWAY ENDS** 🎉")
                .setDescription(`There are no winners, because no one participated!
             
              **Giveaway Hosted By: **${message.author}`)
            msg.edit(non)

            return message.channel.send(`There are no winners, because no one practicipated! :(\n${msg.url}`)
        }

        // choosing someone randomly 
        for (let y = 0; y < winnerCount; y++) {

            inList = false;

            random = Math.floor(Math.random() * peopleReacted.length);

            // if this person already return
            for (let o = 0; o < winners.length; o++) {

                if (winners[o] == peopleReacted[random]) {
                    inList = true;
                    y--;
                    break;
                }
            }


            // if not, list him in the winners
            if (!inList) {
                winners.push(peopleReacted[random]);
            }
        }

        // getting the winner respond
        var response = ``

        // getting all the winners
        for (let y = 0; y < winners.length; y++) {

            // setting the winners in the embed
            response += `${winners[y]}\n`

            // creating the winner embed
            var embed = new discord.MessageEmbed()
                .setColor("#d98a23")
                .setTitle("🎉 **GIVEAWAY ENDS** 🎉")
                .setDescription(`---------------------------------
            **זכית בהגרלה כדי לקבל את הפרס תצטרך לשלוח ל${[message.author]} הודעה בפרטי!**
             **שם ההגרלה:${prize}**
             **Winners:**
             ${response}
             **Giveaway Hosted By: ** ${message.author}`)
            msg.edit(embed) // it will edit the embed 

        }

        // setting the giveaway time
    }, ms(args[0]));
  }
};