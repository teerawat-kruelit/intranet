const query = require('./_database')
const mssql = require('mssql')

module.exports.getBranch = async() => {
    let parameters = []

    let user = await query('SELECT * FROM tb_branch', parameters)
    return user;
}