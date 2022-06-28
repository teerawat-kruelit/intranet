const express = require('express')
const router = express.Router()
const masterController = require('../controller/master.contorller')

router.get('/branch', masterController.getBranch)

module.exports = router