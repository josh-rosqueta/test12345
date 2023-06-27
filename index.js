const express = require("express");
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
require("dotenv").config();

const bot = new ViberBot({
	authToken: process.env.ACCESS_TOKEN,
	name: "Viber Bot",
	avatar: "https://developers.viber.com/docs/img/stickers/40122.png" // It is recommended to be 720x720, and no more than 100kb.
});

const server = express();
server.use(express.json());
server.use('/viber/webhook', bot.middleware());

// const viberURL = 'https://chatapi.viber.com/pa/send_message';
// async function sendMessageWithButtons(receiverId, text, button1Text, button1Data, button2Text, button2Data) {
//   const message = {
//     receiver: receiverId,
//     type: 'text',
//     text: text,
//     keyboard: {
//       Type: 'keyboard',
//       Buttons: [
//         {
//             Columns: 6,
//             Rows: 1,
//             ActionType: 'reply',
//             ActionBody: button1Data,
//             Text: button1Text,
//             TextSize: 'large'
//           },
//           {
//             Columns: 6,
//             Rows: 1,
//             ActionType: 'reply',
//             ActionBody: button2Data,
//             Text: button2Text,
//             TextSize: 'large'
//           }
//       ]
//     }
//   };

//   const options = {
//     uri: viberURL,
//     method: 'POST',
//     headers: {
//       'X-Viber-Auth-Token': process.env.ACCESS_TOKEN,
//       'Content-Type': 'application/json'
//     },
//     body: message,
//     json: true
//   };

//   try {
//     const response = await request(options);
//     console.log(response);
//     return message; // Print the response (for debugging)
//   } catch (error) {
//     console.error(error); // Handle the error
//   }
// }


// function checkUrlAvailability(botResponse, text_received) {
//     let sender_id = botResponse.userProfile.id;
    
//     const text = 'Choose an option:';
//     const button1Text = 'Start';
//     const button1Data = 'button1';
//     const button2Text = 'End Conversation';
//     const button2Data = 'button2';


//     sendMessageWithButtons(sender_id, text, button1Text, button1Data, button2Text, button2Data).then(response => {
//     }).catch(error => console.error(error));
// }

const PORT = process.env.PORT || 8081;

bot.onSubscribe(response => {
  say(response, `Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me if a web site is down for everyone or just you. Just send me a name of a website and I'll do the rest!`);
});

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  // This sample bot can answer only text messages, let's make sure the user is aware of that.
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

server.listen(PORT, async () => {
  console.log("Server is running on port", PORT);
});