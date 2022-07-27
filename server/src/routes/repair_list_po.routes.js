const express = require("express");
const router = express.Router();
const repair_list = require("../controller/repair_list_po.controller");

router.get("/it", repair_list.getRepairPoItList);
router.get("/building", repair_list.getRepairPoBuildingList);
router.get("/:id", repair_list.getRepairPoDetail);

router.put("/:id", repair_list.updateRepairPoList);

module.exports = router;
