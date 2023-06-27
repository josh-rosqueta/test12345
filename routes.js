const express = require('express');
const router = express.Router();
const bot = require('./bot');
const conversationStartedHandler = require('./conversationStartedHandler');
const messageHandler = require('./messageHandler');
const subscribedHandler = require('./subscribedHandler');
const unsubscribedHandler = require('./unsubscribedHandler');

router.post('/conversation_started', conversationStartedHandler);
router.post('/message', messageHandler);
router.post('/subscribed', subscribedHandler);
router.post('/unsubscribed', unsubscribedHandler);

module.exports = router;


router.post('/conversation_started', (req, res) => {
  const { event } = req.body;
  
  if (event === 'conversation_started') {
    try {
      // Handle conversation_started event
      const { user, subscribed } = req.body;
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
