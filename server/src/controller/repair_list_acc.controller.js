const repair_list_acc_model = require("../model/repair_list_acc.model");

module.exports.getRepairAccItList = async (req, res) => {
  let { id } = req.params;
  let userRoleId = req.session.role_id;

  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }

  if (userRoleId !== 4) {
    return res
      .status(403)
      .json({ status: false, message: "Permission denied" });
  }

  let details = await repair_list_acc_model.getRepairAccItList(id);
  if (details.length < 1) {
    return res.json({ status: false, message: "Not found information" });
  }

  return res.json({ status: true, data: details });
};
module.exports.getRepairAccBuildingList = async (req, res) => {
  let { id } = req.params;
  let userRoleId = req.session.role_id;

  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }

  if (userRoleId !== 4) {
    return res
      .status(403)
      .json({ status: false, message: "Permission denied" });
  }

  let details = await repair_list_acc_model.getRepairAccBuildingList(id);
  if (details.length < 1) {
    return res.json({ status: false, message: "Not found information" });
  }

  return res.json({ status: true, data: details });
};
module.exports.getRepairAccDetail = async (req, res) => {
  let { id } = req.params;
  let userRoleId = req.session.role_id;

  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }

  if (userRoleId !== 4) {
    return res
      .status(403)
      .json({ status: false, message: "Permission denied" });
  }

  let details = await repair_list_acc_model.getRepairAccDetail(id);
  if (details.length < 1) {
    return res.json({ status: false, message: "Not found information" });
  }

  return res.json({ status: true, data: details });
};

module.exports.updateRepairAccList = async (req, res) => {
  let { id } = req.params;
  let userid = req.session.userid;
  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }
  if (req.session.role_id !== 4) {
    return res
      .status(403)
      .json({ status: false, message: "permission denied" });
  }
  let body = req.body;

  let update = await repair_list_acc_model.updateRepairAcc(userid, id, body);
  if (update == false) {
    return res.json({ status: false, message: "UPDATE FAILED" });
  } else {
    // updateData = update[0];
    // updateData.close_date = body.close_date;
    // await repair_listModel.createRepairLogs(updateData);
    return res.json({ status: true, message: "UPDATE SUCCESS" });
  }
};
