const masterModel = require("../model/master.model");

module.exports.getBranch = async (req, res) => {
  let data = await masterModel.getBranch();
  return res.json({ status: true, data: data || [] });
};

module.exports.getTopic = async (req, res) => {
  let { type_id } = req.query;
  let data = await masterModel.getTopic(type_id);
  return res.json({ status: true, data: data || [] });
};

module.exports.getStatus = async (req, res) => {
  let data = await masterModel.getStatus();
  return res.json({ status: true, data: data || [] });
};

module.exports.getExpences = async (req, res) => {
  let data = await masterModel.getExpences();
  return res.json({ status: true, data: data || [] });
};
