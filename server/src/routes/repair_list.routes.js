const express = require("express");
const router = express.Router();
const repair_list = require("../controller/repair_list.controller");

router.get("/it", repair_list.getRepairItList);
router.get("/it-logs", repair_list.getRepairItListLogs);
router.get("/it/:id", repair_list.getRepairItList);
router.post("/it", repair_list.createRepairIt);
router.put("/it/:id", repair_list.updateRepairList);

router.put("/:reapir_id/update-rating", repair_list.updateRating);

router.post("/building", repair_list.createRepairBuilding);
router.get("/building-logs", repair_list.getRepairBuildingListLogs);
router.get("/building", repair_list.getRepairBuiList);
router.get("/building/:id", repair_list.getRepairBuiList);
router.put("/building/:id", repair_list.updateRepairList);

module.exports = router;
