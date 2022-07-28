const express = require("express");
const router = express.Router();
const repair_list = require("../controller/repair_list_acc.controller");

router.get("/it", repair_list.getRepairAccItList);
router.get("/building", repair_list.getRepairAccBuildingList);
router.get("/:id", repair_list.getRepairAccDetail);

router.put("/:id", repair_list.updateRepairAccList);

module.exports = router;
