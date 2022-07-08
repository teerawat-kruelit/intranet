const express = require("express");
const router = express.Router();
const reportController = require("../controller/report.controller");

router.get("/repair", reportController.getReportRepair);
router.get("/comment-rating", reportController.getReportCommentRating);
router.get("/rating", reportController.GetReportAdminRating);
router.get("/topic", reportController.GetReportTopic);

module.exports = router;
