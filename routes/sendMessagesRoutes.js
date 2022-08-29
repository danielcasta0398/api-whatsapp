const express = require('express');
const { sendMessages } = require('../controllers/sendMessageController');

const router = express.Router();

router.post('/', sendMessages)

module.exports = { sendMessageRouter : router }