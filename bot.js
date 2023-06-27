const { Bot } = require('viber-bot');
const bot = new Bot({
  authToken: 'YOUR_AUTH_TOKEN',
  name: 'YourBotName',
  avatar: 'https://example.com/avatar.png',
});

module.exports = bot;