const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const userRoutes = require("./user.routes");
const repair_it_list = require("./repair_list.routes");
const repair_it_list_po = require("./repair_list_po.routes");
const repair_it_list_fin = require("./repair_list_fin.routes");
const repair_it_list_acc = require("./repair_list_acc.routes");
const masterRoutes = require("./master.routes");
const ticketRoutes = require("./ticket.routes");
const reportRoutes = require("./report.routes");

const uploadController = require("../controller/upload.controller");
const upload = require("../../middleware/multerRepair.middleware");

router.post("/api/login", authController.login);
router.post("/api/logout", authController.logout);
router.post("/api/register", authController.register);
router.use("/api/user", userRoutes);
router.use("/api/m", masterRoutes);
router.use("/api/repair_list", repair_it_list);
router.use("/api/repair_list_po", repair_it_list_po);
router.use("/api/repair_list_fin", repair_it_list_fin);
router.use("/api/repair_list_acc", repair_it_list_acc);
router.use("/api/ticket", ticketRoutes);
router.use("/api/report", reportRoutes);

router.post(
  "/api/upload/repair",
  upload.single("image"),
  uploadController.uploadImage
);

module.exports = router;
