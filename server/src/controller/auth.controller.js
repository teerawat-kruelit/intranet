const authModel = require("../model/auth.model");
const Validator = require("validatorjs");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res) => {
  let body = req.body;

  let users = await authModel.getUserByUsername(body.EUsername);
  if (users.length < 1) {
    return res.json({ status: false, message: "user or password is invalid" });
  }
  let user = users[0];
  if (user.password != body.password) {
    return res.json({ status: false, message: "user or password is invalid" });
  }

  req.session.isLogin = true;
  req.session.userid = user.id;
  req.session.role_id = user.role;
  // return res.json({ status: true, message: "login successfully", user });
  return res.json({ status: true, message: "login successfully", data: { role: user.role } });
};

module.exports.logout = async (req, res) => {
  req.session.destroy();
  return res.json({ status: true, message: "logout successfully" });
};

module.exports.register = async (req, res) => {
  let body = req.body;

  let rules = {
    TUserName: "required",
    EUserName: "required",
    email: "required",
    EPassword: "required",
    ExtNo: "required",
    Position: "required",
  };

  let validation = new Validator(body, rules);
  if (validation.fails())
    return res.status(412).json({
      status: false,
      message:
        validation.errors.errors[Object.keys(validation.errors.errors)[0]][0],
    });

  let users = await authModel.getUserByUsername(body.EUsername);
  if (users.length > 0) {
    return res.json({ status: false, message: "exists user" });
  }

  let result = await authModel.createUser(body);
  if (!result)
    return res.json({ status: false, message: "failed to register" });
  return res.json({ status: true, message: "register successfully" });
};
