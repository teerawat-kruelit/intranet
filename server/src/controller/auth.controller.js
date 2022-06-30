const authModel = require('../model/auth.model')
const Validator = require('validatorjs');
const bcrypt = require('bcrypt')

module.exports.login = async (req, res) => {
    let body = req.body

    let users = await authModel.getUserByUsername(body.EUsername)
    if (users.length < 1) {
        return res.json({ status: false, message: 'user or password is invalid' })
    }
    let user = users[0]
    let match = await bcrypt.compare(body.EPassword, user.EPassword)
    if (!match) {
        return res.json({ status: false, message: 'user or password is invalid' })
    }

    req.session.isLogin = true
    req.session.userid = user.id
    req.session.role_id = user.role
    return res.json({ status: true, message: 'login successfully' })
}

module.exports.logout = async (req, res) => {
    req.session.destroy();
    return res.json({ status: true, message: 'logout successfully' })
}

module.exports.register = async (req, res) => {
    let body = req.body

    let rules = {
        TUsername: 'required',
        EUsername: 'required',
        Extno: 'required|string|size:10',
        Position: 'required',
        EPassword: 'required',
        email: 'required|email',
    };

    let validation = new Validator(body, rules);
    if (validation.fails()) return res.status(412).json({ status: false, message: validation.errors.errors[Object.keys(validation.errors.errors)[0]][0] })

    let users = await authModel.getUserByUsername(body.EUsername)
    if (users.length > 0) {
        return res.json({ status: false, message: 'exists user' })
    }

    body.EPassword = await bcrypt.hash(body.EPassword, 13)
    let result = await authModel.createUser(body)
    if (!result) return res.json({ status: false, message: 'failed to register' })
    return res.json({ status: true, message: 'register successfully' })
}