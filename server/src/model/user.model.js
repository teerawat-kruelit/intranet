const query = require('./_database')
const mssql = require('mssql')

module.exports.getProfileByID = async (id) => {
    let parameters = [
        { name: "id", sqltype: mssql.Int, value: id },
    ]
    let user = await query(`
        SELECT EUserName, TUserName, Position, ExtNo, role
        FROM tb_users 
        WHERE id=@id
    `, parameters)
    return user;
}

module.exports.updateProfile = async (id, body) => {
    let sql = `
    UPDATE tb_users 
    SET 
        first_name=@first_name
        , last_name=@last_name
        , email=@email
        , phone=@phone 
    OUTPUT Inserted.id
    WHERE id=@id
    `

    let parameters = [
        { name: "id", sqltype: mssql.Int, value: id },
        { name: "first_name", sqltype: mssql.VarChar, value: body.first_name },
        { name: "last_name", sqltype: mssql.VarChar, value: body.last_name },
        { name: "email", sqltype: mssql.VarChar, value: body.email },
        { name: "phone", sqltype: mssql.VarChar, value: body.phone },

    ]
    let user = await query(sql, parameters)
    return user
}

module.exports.getEmployeeByID = async (type_dep) => {
    let parameters = [
        { name: "type_dep", sqltype: mssql.Int, value: type_dep },
    ]
    let user = await query(`
        SELECT TUserName, Position, ExtNo, image
        FROM tb_users
        WHERE type_dep = @type_dep
    `, parameters)
    return user;
}