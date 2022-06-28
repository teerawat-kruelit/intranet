const repair_listModel = require('../model/repair_list.model')


module.exports.getRepairItList = async (req, res) => {
    // let userid = 9
    let { id } = req.params
    let userid = req.session.userid
    if (!req.session.isLogin) {
        return res.status(401).json({ status: false, message: 'unauthorize' })
    }
    let userRoleId = req.session.role_id

    let details = await repair_listModel.getRepairItList(userid, userRoleId, id)
    if (details.length < 1) {
        return res.json({ status: false, message: 'Not found information' })
    }

    return res.json({ status: true, data: details })
}

module.exports.getRepairBuiList = async (req, res) => {
    // let userid = 9
    let { id } = req.params
    let userid = req.session.userid
    if (!req.session.isLogin) {
        return res.status(401).json({ status: false, message: 'unauthorize' })
    }
    let userRoleId = req.session.role_id

    let details = await repair_listModel.getRepairBuiList(userid, userRoleId, id)
    if (details.length < 1) {
        return res.json({ status: false, message: 'Not found information' })
    }
    return res.json({ status: true, data: details })

}

module.exports.updateRepairItList = async (req, res) => {
    let { id } = req.params
    let userid = req.session.userid
    if (!req.session.isLogin) {
        return res.status(401).json({ status: false, message: 'unauthorize' })
    }
    if (req.session.role_id !== 2) {
        return res.status(403).json({ status: false, message: 'permission denied' })
    }
    let body = req.body

    let update = await repair_listModel.updateRepairBuiList(userid, id, body)
    if (update == false) {
        return res.json({ status: false, message: 'UPDATE FAILED' })
    } else {
        return res.json({ status: true, message: 'UPDATE SUCCESS' })
    }
}

module.exports.createRepairIt = async (req, res) => {
    let userid = req.session.userid
    if (!req.session.isLogin) return res.status(401).json({ status: false, message: 'unauthorize' })
    let body = req.body

    let duplicatetoken = await repair_listModel.getRepairListItByTickid(body.ticket_no)
    if (duplicatetoken.length > 0) {
        return res.json({ status: false, message: 'Duplicate token id' })
    }

    let insert = await repair_listModel.createRepairIT(body.ticket_no, userid, body.ip, body.branch, body.description)

    if (insert == false) {
        return res.json({ status: false, message: 'INSERT Not found' })
    } else {
        return res.json({ status: true, message: 'INSERT SUCCESS' })
    }
}

module.exports.createRepairBuilding = async (req, res) => {
    let userid = req.session.userid
    if (!req.session.isLogin) return res.status(401).json({ status: false, message: 'unauthorize' })
    let body = req.body

    let duplicatetoken = await repair_listModel.getRepairListBuildingByTickid(body.ticket_no)
    if (duplicatetoken.length > 0) {
        return res.json({ status: false, message: 'Duplicate token id' })
    }

    let insert = await repair_listModel.createRepairBuilding(body.ticket_no, userid, body.branch, body.description)
    if (insert == false) {
        return res.json({ status: false, message: 'INSERT NOT FOUND' })
    } else {
        return res.json({ status: true, message: 'INSERT SUCCESS' })
    }

}