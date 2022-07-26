const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')

router.get('/profile', userController.getProfile)
router.put('/profile', userController.updateProfile)
router.get('/employee',userController.getEmployee)

module.exports = router