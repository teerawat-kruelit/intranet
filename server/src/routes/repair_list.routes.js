const express = require('express')
const router = express.Router()
const repair_list = require('../controller/repair_list.controller')

router.get('/it', repair_list.getRepairItList)
router.get('/it/:id', repair_list.getRepairItList)
router.post('/it', repair_list.createRepairIt)
router.post('/building', repair_list.createRepairBuilding)
router.get('/building', repair_list.getRepairBuiList)
router.get('/building/:id', repair_list.getRepairBuiList)

module.exports = router