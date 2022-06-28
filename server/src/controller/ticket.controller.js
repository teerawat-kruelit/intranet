
const ticketModel =  require('../model/ticket.model')

module.exports.getLastTicket = async(req, res) => {
    let query = req.query
    let data = await ticketModel.getLastTicket(query.type_id)
    return res.json({ status: true, data: data })
}