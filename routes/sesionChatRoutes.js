const express = require('express')

const router = express.Router();

const  { sessionChat, getSession } = require('../controllers/sessionController')

router.post('/', sessionChat)
router.post('/getsession', getSession)

module.exports = { sesionChatRouter : router }