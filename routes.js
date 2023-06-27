const express = require('express');
const router = express.Router();
const bot = require('./bot');

module.exports = router;

router.use((req, res, next) => {
    req.headers['x-viber-auth-token'] = '513d6faf5fe7e2c3-86ed98ee495db94b-d885f5b71e8ea0ee'; // Replace with your Viber authentication token
    next();
});

router.post('/conversation_started', (req, res) => {
  const { event } = req.body;
  bot.bot
  
  if (event === 'conversation_started') {
    try {
      // Handle conversation_started event
      const { user, subscribed } = req.body;
      console.log("HELLO");
      // Your logic goes here
    } catch (error) {
      console.error('Error handling conversation_started event:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.json({});
  }
});

router.post('/message', (req, res) => {
  const { event } = req.body;
  
  if (event === 'message') {
    try {
      // Handle message event
      const { message } = req.body;
      // Your logic goes here
    } catch (error) {
      console.error('Error handling message event:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.json({});
  }
});

router.post('/subscribed', (req, res) => {
  const { event } = req.body;
  
  if (event === 'subscribed') {
    try {
      // Handle subscribed event
      const { user } = req.body;
      // Your logic goes here
    } catch (error) {
      console.error('Error handling subscribed event:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.json({});
  }
});

router.get('/unsubscribed', (req, res) => {
  const { event } = req.body;
  
  if (event === 'unsubscribed') {
    try {
      // Handle unsubscribed event
      const { user } = req.body;
      // Your logic goes here
    } catch (error) {
      console.error('Error handling unsubscribed event:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.json({});
  }
});

module.exports = router;
