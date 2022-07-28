const express = require("express");
const router = express.Router();
const repair_list = require("../controller/repair_list_fin.controller");

router.get("/it", repair_list.getRepairFinItList);
router.get("/building", repair_list.getRepairFinBuildingList);
router.get("/:id", repair_list.getRepairFinDetail);

router.put("/:id", repair_list.updateRepairFinList);

module.exports = router;
