const express = require('express');
const router = express.Router();
const bot = require('./bot');

router.post('/conversation_started', (req, res) => {
  // Handle conversation_started event
  // Your logic goes here
});

router.post('/message', (req, res) => {
  // Handle message event
  // Your logic goes here
});

router.post('/subscribed', (req, res) => {
  // Handle subscribed event
  // Your logic goes here
});

router.post('/unsubscribed', (req, res) => {
  // Handle unsubscribed event
  // Your logic goes here
});

module.exports = router;
