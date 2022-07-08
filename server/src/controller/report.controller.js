const reportModel = require("../model/report.model");

module.exports.getReportRepair = async (req, res) => {
  let { year, month, type_id } = req.query;
  let admin_id = req.session.userid;
  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }
  if (req.session.role_id !== 3) {
    return res.status(403).json({ status: false, message: "permission denied" });
  }

  let data = await reportModel.getReportRepair(year, month, type_id, admin_id);
  return res.json({ status: true, data: data.length > 0 ? data[0] : {} });
};

module.exports.getReportCommentRating = async (req, res) => {
  let { year, month, type_id } = req.query;
  let admin_id = req.session.userid;
  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }
  if (req.session.role_id !== 3) {
    return res.status(403).json({ status: false, message: "permission denied" });
  }

  let data = await reportModel.getReportCommentRating(year, month, type_id);
  return res.json({ status: true, data: data });
};

module.exports.GetReportAdminRating = async (req, res) => {
  let { year, month, type_id } = req.query;
  let userid = req.session.userid;

  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }
  if (req.session.role_id !== 3) {
    return res.status(403).json({ status: false, message: "permission denied" });
  }

  let data = await reportModel.GetReportAdminRating(year, month, type_id, userid);
  return res.json({ status: true, data: data || [] });
};

module.exports.GetReportTopic = async (req, res) => {
  let { year, month, type_id } = req.query;

  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }
  if (req.session.role_id !== 3) {
    return res.status(403).json({ status: false, message: "permission denied" });
  }

  let data = await reportModel.GetReportTopic(year, month, type_id);
  return res.json({ status: true, data: data || [] });
};
