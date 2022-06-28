
const masterModel =  require('../model/master.model')

module.exports.getBranch = async(req, res) => {

    let data = await masterModel.getBranch()
    return res.json({ status: true, data: data || [] })
}