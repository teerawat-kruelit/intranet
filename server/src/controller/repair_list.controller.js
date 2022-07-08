const repair_listModel = require("../model/repair_list.model");

module.exports.getRepairItList = async (req, res) => {
  // let userid = 9
  let { id } = req.params;
  let userid = req.session.userid;
  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }
  let userRoleId = req.session.role_id;

  let details = await repair_listModel.getRepairItList(userid, userRoleId, id);
  if (details.length < 1) {
    return res.json({ status: false, message: "Not found information" });
  }

  return res.json({ status: true, data: details });
};

module.exports.getRepairItListLogs = async (req, res) => {
  // let userid = 9
  let { id } = req.params;
  let userid = req.session.userid;
  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }
  let userRoleId = req.session.role_id;

  let details = await repair_listModel.getRepairItListLogs(
    userid,
    userRoleId,
    id
  );
  if (details.length < 1) {
    return res.json({ status: false, message: "Not found information" });
  }

  return res.json({ status: true, data: details });
};

module.exports.getRepairBuiList = async (req, res) => {
  // let userid = 9
  let { id } = req.params;
  let userid = req.session.userid;
  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }
  let userRoleId = req.session.role_id;

  let details = await repair_listModel.getRepairBuiList(userid, userRoleId, id);
  if (details.length < 1) {
    return res.json({ status: false, message: "Not found information" });
  }
  return res.json({ status: true, data: details });
};

module.exports.getRepairBuildingListLogs = async (req, res) => {
  // let userid = 9
  let { id } = req.params;
  let userid = req.session.userid;
  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }
  let userRoleId = req.session.role_id;

  let details = await repair_listModel.getRepairBuildingListLogs(
    userid,
    userRoleId,
    id
  );
  if (details.length < 1) {
    return res.json({ status: false, message: "Not found information" });
  }

  return res.json({ status: true, data: details });
};

module.exports.updateRepairList = async (req, res) => {
  let { id } = req.params;
  let userid = req.session.userid;
  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }
  if (req.session.role_id !== 2) {
    return res
      .status(403)
      .json({ status: false, message: "permission denied" });
  }
  let body = req.body;

  let update = await repair_listModel.updateRepairList(userid, id, body);
  if (update == false) {
    return res.json({ status: false, message: "UPDATE FAILED" });
  } else {
    updateData = update[0];
    updateData.close_date = body.close_date;
    await repair_listModel.createRepairLogs(updateData);
    return res.json({ status: true, message: "UPDATE SUCCESS" });
  }
};

module.exports.createRepairIt = async (req, res) => {
  let userid = req.session.userid;
  if (!req.session.isLogin)
    return res.status(401).json({ status: false, message: "unauthorize" });
  let body = req.body;

  let duplicatetoken = await repair_listModel.getRepairListItByTickid(
    body.ticket_no
  );
  if (duplicatetoken.length > 0) {
    return res.json({ status: false, message: "Duplicate token id" });
  }

  let insert = await repair_listModel.createRepairIT(
    body.ticket_no,
    userid,
    body.ip,
    body.branch,
    body.description
  );
  if (insert == false) {
    return res.json({ status: false, message: "INSERT Not found" });
  } else {
    insertData = insert[0];
    await repair_listModel.createRepairLogs(insertData);
    return res.json({ status: true, message: "INSERT SUCCESS" });
  }
};

module.exports.createRepairBuilding = async (req, res) => {
  let userid = req.session.userid;
  if (!req.session.isLogin)
    return res.status(401).json({ status: false, message: "unauthorize" });
  let body = req.body;

  let duplicatetoken = await repair_listModel.getRepairListBuildingByTickid(
    body.ticket_no
  );
  if (duplicatetoken.length > 0) {
    return res.json({ status: false, message: "Duplicate token id" });
  }

  let insert = await repair_listModel.createRepairBuilding(
    body.ticket_no,
    userid,
    body.branch,
    body.description
  );
  if (insert == false) {
    return res.json({ status: false, message: "INSERT NOT FOUND" });
  } else {
    return res.json({ status: true, message: "INSERT SUCCESS" });
  }
};

module.exports.updateRating = async (req, res) => {
  let { reapir_id } = req.params;
  let body = req.body;

  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }
  if (req.session.role_id !== 1) {
    return res
      .status(403)
      .json({ status: false, message: "permission denied" });
  }

  let updatedResult = await repair_listModel.updateRating(
    reapir_id,
    body.rating,
    body.comment_rating
  );
  if (updatedResult.length < 1)
    return res.json({ status: false, message: "Update Failed" });
  return res.json({ status: true, message: "Update Success" });
};
