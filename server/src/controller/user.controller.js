const userModel = require('../model/user.model')
const Validator = require('validatorjs');

module.exports.getProfile = async (req, res) => {

    let userid = req.session.userid
    if (!req.session.isLogin) {
        return res.status(401).json({ status: false, message: 'unauthorize' })
    }

    let profiles = await userModel.getProfileByID(userid)
    if (profiles.length < 1) {
        return res.json({ status: false, message: 'Not found profile' })
    }

    let profile = profiles[0]
    return res.json({ status: true, data: profile })
}

module.exports.updateProfile = async (req, res) => {
    let userid = req.session.userid
    if (!req.session.isLogin) {
        return res.status(401).json({ status: false, message: 'unauthorize' })
    }

    let body = req.body
    let rules = {
        first_name: 'required',
        last_name: 'required',
        phone: 'required|string|size:10',
        email: 'required|email',
    };

    let validation = new Validator(body, rules);
    if (validation.fails()) return res.status(412).json({ status: false, message: validation.errors.errors[Object.keys(validation.errors.errors)[0]][0] })

    let results = await userModel.updateProfile(userid, body)
    if (results.length < 1) {
        return res.json({ status: false, message: 'Failed to updaed' })
    }

    return res.json({ status: true, maessage: 'Update SuccessFully' })
}

module.exports.getEmployee = async (req, res) => {

    let { type_dep } = req.query;

    // let userid = req.session.userid
    // if (!req.session.isLogin) {
    //     return res.status(401).json({ status: false, message: 'unauthorize' })
    // }

    let employees = await userModel.getEmployeeByID(type_dep)
    if (employees.length < 1) {
        return res.json({ status: true, data: [] })
    }

    let employee = employees
    return res.json({ status: true, data: employee })
}