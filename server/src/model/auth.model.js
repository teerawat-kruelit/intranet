const query = require('./_database')
const mssql = require('mssql')

module.exports.getUserByUsername = async (EUsername) => {
    let parameters = [
        { name: "EUsername", sqltype: mssql.VarChar, value: EUsername },
    ]

    let user = await query('SELECT * FROM tb_users WHERE EUsername = @EUsername', parameters)
    return user;
}

module.exports.createUser = async (body) => {
    let sql = `
        INSERT INTO tb_users (email, TUserName, EUserName, ExtNo, Position, EPassword, type_dep, role, create_at)
        OUTPUT Inserted.id
        VALUES (@email, @TUsername, @EUsername, @Extno, @Position, @EPassword, 1, 1, GETDATE())
    `
    let parameters = [
        { name: "email", sqltype: mssql.VarChar, value: body.email },
        { name: "TUsername", sqltype: mssql.VarChar, value: body.TUserName },
        { name: "EUsername", sqltype: mssql.VarChar, value: body.EUserName },
        { name: "Extno", sqltype: mssql.VarChar, value: body.ExtNo },
        { name: "Position", sqltype: mssql.VarChar, value: body.Position },
        { name: "EPassword", sqltype: mssql.VarChar, value: body.EPassword },
    ]

    let result = await query(sql, parameters)
    return result
}