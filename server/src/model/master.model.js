const query = require('./_database')
const mssql = require('mssql')

module.exports.getBranch = async() => {
    let parameters = []
    let result = await query('SELECT * FROM tb_branch', parameters)
    return result;
}

module.exports.getTopic = async(type_id) => {
    let parameters = [{ name: "type_id", sqltype: mssql.Int, value: type_id }]
    let result = await query('SELECT * FROM tb_topic WHERE type_id = @type_id OR type_id IS NULL', parameters)
    return result;
}

module.exports.getStatus = async() => {
    let parameters = []
    let result = await query('SELECT * FROM tb_status', parameters)
    return result;
}


module.exports.getExpences = async() => {
    let parameters = []
    let result = await query('SELECT * FROM tb_expences', parameters)
    return result;
}


