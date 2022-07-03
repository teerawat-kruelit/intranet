const express = require("express");
const router = express.Router();
const reportController = require("../controller/report.controller");

router.get("/repair", reportController.getReportRepair);

module.exports = router;
