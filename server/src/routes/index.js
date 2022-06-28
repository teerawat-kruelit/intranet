const express = require('express')
const router = express.Router()
const authController = require('../controller/auth.controller')
const userRoutes = require('./user.routes')
const repair_it_list = require('./repair_list.routes')
const masterRoutes = require('./master.routes')
const ticketRoutes = require('./ticket.routes')

router.post('/api/login', authController.login)
router.post('/api/register', authController.register)
router.use('/api/user', userRoutes)
router.use('/api/m', masterRoutes)
router.use('/api/repair_list', repair_it_list)
router.use('/api/ticket', ticketRoutes)
router.use('/api/ticket', ticketRoutes)

module.exports = router