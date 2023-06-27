'use strict';

require('dotenv').config();
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;

const TextMessage = require('viber-bot').Message.Text;
const UrlMessage = require('viber-bot').Message.Url;
const ContactMessage = require('viber-bot').Message.Contact;
const PictureMessage = require('viber-bot').Message.Picture;
const VideoMessage = require('viber-bot').Message.Video;
const LocationMessage = require('viber-bot').Message.Location;
const StickerMessage = require('viber-bot').Message.Sticker;
const FileMessage = require('viber-bot').Message.File;
const RichMediaMessage = require('viber-bot').Message.RichMedia;
const KeyboardMessage = require('viber-bot').Message.Keyboard;
const request = require('request-promise');

const ngrok = require('./get_public_url');

function say(response, message) {
    response.send(new TextMessage(message));
}



const botToken = '513d6faf5fe7e2c3-86ed98ee495db94b-d885f5b71e8ea0ee';
const viberURL = 'https://chatapi.viber.com/pa/send_message';

async function sendMessageWithButtons(receiverId, text, button1Text, button1Data, button2Text, button2Data) {
  const message = {
    receiver: receiverId,
    type: 'text',
    text: text,
    keyboard: {
      Type: 'keyboard',
      Buttons: [
        {
            Columns: 6,
            Rows: 1,
            ActionType: 'reply',
            ActionBody: button1Data,
            Text: button1Text,
            TextSize: 'large'
          },
          {
            Columns: 6,
            Rows: 1,
            ActionType: 'reply',
            ActionBody: button2Data,
            Text: button2Text,
            TextSize: 'large'
          }
      ]
    }
  };

  const options = {
    uri: viberURL,
    method: 'POST',
    headers: {
      'X-Viber-Auth-Token': botToken,
      'Content-Type': 'application/json'
    },
    body: message,
    json: true
  };

  try {
    const response = await request(options);
    console.log(response);
    return message;
  } catch (error) {
    console.error(error);
  }
}


function checkUrlAvailability(botResponse, text_received) {
    let sender_name = botResponse.userProfile.name;
    let sender_id = botResponse.userProfile.id;
    let message;
    
    const receiverId = 'RECEIVER_USER_ID';
    const text = 'Choose an option:';
    const button1Text = 'Start';
    const button1Data = 'button1';
    const button2Text = 'End Conversation';
    const button2Data = 'button2';


    sendMessageWithButtons(sender_id, text, button1Text, button1Data, button2Text, button2Data).then(response => {
        const messageType = response.keyboard.Type;
        const buttons = response.keyboard.Buttons;
    }).catch(error => console.error(error));
}

const bot = new ViberBot({
	authToken: process.env.ACCESS_TOKEN,
	name: "Viber Bot",
	avatar: "https://developers.viber.com/docs/img/stickers/40122.png"
});

bot.onSubscribe(response => {
    say(response, `Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me if a web site is down for everyone or just you. Just send me a name of a website and I'll do the rest!`);
});

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    if (!(message instanceof TextMessage)) {
        say(response, `Sorry. I can only understand text messages.`);
        
        if(message instanceof PictureMessage) {
            say(response, `You sent picture message`);
        }
    }
});

bot.onTextMessage(/./, (message, response) => {
    checkUrlAvailability(response, message.text);
});

bot.getBotProfile().then(response => console.log(`Bot Named: ${response.name}`));

http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(process.env.NOW_URL));

// if (process.env.NOW_URL || process.env.HEROKU_URL) {
//     const http = require('http');
//     const port = process.env.PORT || 5000;

//     http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(process.env.NOW_URL || process.env.HEROKU_URL));
// } else {
//     return ngrok.getPublicUrl().then(publicUrl => {
//         const http = require('http');
//         const port = process.env.PORT || 5000;

//         console.log('publicUrl => ', publicUrl);

//         http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(publicUrl));

//     }).catch(error => {
//         console.log('Can not connect to ngrok server. Is it running?');
//         console.error(error);
//         process.exit(1);
//     });
// }