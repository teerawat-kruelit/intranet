const express = require('express')
const router = express.Router()
const ticketController = require('../controller/ticket.controller')

router.get('/last', ticketController.getLastTicket)

module.exports = router