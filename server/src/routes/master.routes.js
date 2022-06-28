const express = require('express')
const router = express.Router()
const masterController = require('../controller/master.contorller')

router.get('/branch', masterController.getBranch)
router.get('/topic', masterController.getTopic)
router.get('/status', masterController.getStatus)
router.get('/expences', masterController.getExpences)

module.exports = router