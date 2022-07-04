const reportModel = require("../model/report.model");

module.exports.getReportRepair = async (req, res) => {
  let { year, month, type_id } = req.query;
  let admin_id = req.session.userid;
  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }
  if (req.session.role_id !== 2) {
    return res.status(403({ status: false, message: "permission denied" }));
  }

  let data = await reportModel.getReportRepair(year, month, type_id, admin_id);
  return res.json({ status: true, data: data.length > 0 ? data[0] : {} });
};

module.exports.GetReportAdminRating = async (req, res) => {
  let { year, month, type_id } = req.query;
  let userid = req.session.userid;

  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }
  if (req.session.role_id !== 2) {
    return res.status(403({ status: false, message: "permission denied" }));
  }

  let data = await reportModel.GetReportAdminRating(year, month, type_id, userid);
  return res.json({ status: true, data: data.length > 0 ? data[0] : {} });
};
