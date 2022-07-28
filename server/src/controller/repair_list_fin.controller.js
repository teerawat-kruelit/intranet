const repair_list_fin_model = require("../model/repair_list_fin.model");

module.exports.getRepairFinItList = async (req, res) => {
  let { id } = req.params;
  let userRoleId = req.session.role_id;

  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }

  if (userRoleId !== 6) {
    return res
      .status(403)
      .json({ status: false, message: "Permission denied" });
  }

  let details = await repair_list_fin_model.getRepairFinItList(id);
  if (details.length < 1) {
    return res.json({ status: false, message: "Not found information" });
  }

  return res.json({ status: true, data: details });
};
module.exports.getRepairFinBuildingList = async (req, res) => {
  let { id } = req.params;
  let userRoleId = req.session.role_id;

  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }

  if (userRoleId !== 6) {
    return res
      .status(403)
      .json({ status: false, message: "Permission denied" });
  }

  let details = await repair_list_fin_model.getRepairFinBuildingList(id);
  if (details.length < 1) {
    return res.json({ status: false, message: "Not found information" });
  }

  return res.json({ status: true, data: details });
};
module.exports.getRepairFinDetail = async (req, res) => {
  let { id } = req.params;
  let userRoleId = req.session.role_id;

  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }

  if (userRoleId !== 6) {
    return res
      .status(403)
      .json({ status: false, message: "Permission denied" });
  }

  let details = await repair_list_fin_model.getRepairFinDetail(id);
  if (details.length < 1) {
    return res.json({ status: false, message: "Not found information" });
  }

  return res.json({ status: true, data: details });
};

module.exports.updateRepairFinList = async (req, res) => {
  let { id } = req.params;
  let userid = req.session.userid;
  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }
  if (req.session.role_id !== 6) {
    return res
      .status(403)
      .json({ status: false, message: "permission denied" });
  }
  let body = req.body;

  let update = await repair_list_fin_model.updateRepairFin(userid, id, body);
  if (update == false) {
    return res.json({ status: false, message: "UPDATE FAILED" });
  } else {
    // updateData = update[0];
    // updateData.close_date = body.close_date;
    // await repair_listModel.createRepairLogs(updateData);
    return res.json({ status: true, message: "UPDATE SUCCESS" });
  }
};
