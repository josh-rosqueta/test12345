const express = require('express');
const router = express.Router();
const conversationStartedHandler = require('./conversationStartedHandler');
const messageHandler = require('./messageHandler');
const subscribedHandler = require('./subscribedHandler');
const unsubscribedHandler = require('./unsubscribedHandler');

router.post('/conversation_started', conversationStartedHandler);
router.post('/message', messageHandler);
router.post('/subscribed', subscribedHandler);
router.post('/unsubscribed', unsubscribedHandler);

module.exports = router;
