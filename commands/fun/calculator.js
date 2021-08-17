const Discord = require('discord.js');
const disbut = require('discord-buttons');
const { Calculator } = require('weky');

module.exports = {
  name: "calculator",
  aliases: [],
  description: "Send A calculator!",
  usage: "calculator",
  run: async (client, message, args) => {
    await Calculator({
        message: message,
        embed: {
            title: 'Calculator | Aviel Development',
            color: '#5865F2',
            timestamp: true,
        },
        disabledQuery: 'Calculator is disabled!',
        invalidQuery: 'The provided equation is invalid!',
    });
  }
};