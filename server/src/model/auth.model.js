const query = require('./_database')
const mssql = require('mssql')

module.exports.getUserByUsername = async(EUsername) => {
    let parameters = [
        { name: "EUsername", sqltype: mssql.VarChar, value: EUsername },
    ]

    let user = await query('SELECT * FROM tb_users WHERE EUsername = @EUsername', parameters)
    return user;
}

module.exports.createUser = async(body) => {
    let sql = `
        INSERT INTO tb_users (email, TUsername, EUsername, Extno, Position, EPassword)
        OUTPUT Inserted.id
        VALUES (@email, @TUsername, @EUsername, @Extno, @Position, @EPassword)
    `
    let parameters = [
        { name: "email", sqltype: mssql.VarChar, value: body.email },
        { name: "TUsername", sqltype: mssql.VarChar, value: body.TUsername },
        { name: "EUsername", sqltype: mssql.VarChar, value: body.EUsername },
        { name: "Extno", sqltype: mssql.VarChar, value: body.Extno },
        { name: "Position", sqltype: mssql.VarChar, value: body.Position },
        { name: "EPassword", sqltype: mssql.VarChar, value: body.EPassword },
    ]

    let result = await query(sql, parameters)
    return result
}