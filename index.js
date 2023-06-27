const express = require("express");
const cors = require("cors");
const middlewares = require("middlewares");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
require("dotenv").config();

const server = express();

const PORT = process.env.PORT || 8081;

const bot = new ViberBot({
	authToken: process.env.ACCESS_TOKEN,
	name: "Viber Bot",
	avatar: "https://developers.viber.com/docs/img/stickers/40122.png" // It is recommended to be 720x720, and no more than 100kb.
});


server.use(cors());
server.use(helmet());
server.use(morgan("dev"));
server.use(middlewares);
server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ limit: "50mb", extended: true }));
server.use("/viber/webhook", bot.middleware());

server.post("/api/token", function (req, res) {
  const user = { id: 3 };
  const tokens = jwt.sign({ user }, "rTTYB866J_Y<)fu");
  res.json({
    tokens: tokens,
  });
});

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