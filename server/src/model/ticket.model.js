const query = require('./_database')
const mssql = require('mssql')

module.exports.getLastTicket = async(type_id) => {
    let parameters = [
        {name: 'type_id', sqltype: mssql.Int, value: type_id}
    ]
    let user = await query(`
        SELECT TOP(1) id, ticket_no
        FROM repair_list
        WHERE type_id = @type_id
        ORDER BY id DESC
    `, parameters)
    return user;
}