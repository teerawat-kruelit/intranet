const query = require('./_database')
const mssql = require('mssql')

module.exports.getRepairListItByTickid = async (ticketId) => {
    let parameters = [
        { name: "ticket_no", sqltype: mssql.VarChar, value: ticketId }
    ]
    let result = query(
        `SELECT rt.ticket_no FROM repair_list rt WHERE rt.ticket_no = @ticket_no AND rt.type_id = 1`, parameters)
    return result;
}

module.exports.getRepairItList = async (userid, roleId, id) => {
    let parameters = [
        { name: "userid", sqltype: mssql.Int, value: userid },
        { name: "id", sqltype: mssql.Int, value: id },
    ]

    let sql = `
    SELECT rt.id, rt.ticket_no, FORMAT (rt.create_date, 'yyyy-MM-dd HH:mm:ss') as create_date, u.TUserName, u.ExtNo, rt.ip
    , d.name as depart_name,rt.description,ua.TUserName as admin_name,rt.remark,s.name as status
    , b.name as branch
    FROM repair_list rt
    Left join tb_users u On u.id = rt.user_id
    Left join tb_users ua On ua.id = rt.admin_id
    Left join tb_department d On d.id = rt.dep_id
    Left join tb_status s ON s.id =rt.status_id
    Left join tb_type t ON t.id=rt.type_id
    Left join tb_branch b ON b.id = rt.branch_id
    WHERE rt.type_id = 1
    `

    if (roleId === 1) {
        sql += `    
        AND rt.user_id = @userid
    `
    }

    if (id) {
        sql += ` AND rt.id = @id`
    }

    let user = await query(sql, parameters)
    return user;
}

module.exports.getRepairBuiList = async (userid, roleId, id) => {
    let parameters = [
        { name: "userid", sqltype: mssql.Int, value: userid },
        { name: "id", sqltype: mssql.Int, value: id },
    ]
    let sql = `
        SELECT rt.id, rt.ticket_no, FORMAT (rt.create_date, 'yyyy-MM-dd HH:mm:ss') as create_date, u.TUserName, d.name as department, b.name as branch, u.ExtNo,
        rt.description, ua.TUserName as admin_name, rt.remark, s.name as status
        FROM repair_list rt
        Left join tb_users u ON u.id = rt.user_id
        Left join tb_department d ON d.id =rt.dep_id
        Left join tb_branch b ON b.id = rt.branch_id
        Left join tb_users ua ON ua.id = rt.admin_id
        Left join tb_status s ON s.id = rt.status_id
        WHERE rt.type_id = 2
    `
    if (roleId === 1) {
        sql += `    
        AND rt.user_id = @userid
    `
    }

    if (id) {
        sql += ` AND rt.id = @id`
    }

    let user = await query(sql, parameters)
    return user;
}

module.exports.createRepairIT = async (ticket_no, user_id, ip, branch_id, description) => {
    let parameters = [
        { name: "ticket_no", sqltype: mssql.VarChar, value: ticket_no },
        { name: "user_id", sqltype: mssql.Int, value: user_id },
        { name: "ip", sqltype: mssql.VarChar, value: ip },
        { name: "branch_id", sqltype: mssql.Int, value: branch_id },
        { name: "description", sqltype: mssql.VarChar, value: description }
    ]

    let insert = await query(`
    INSERT INTO repair_list 
    (ticket_no,user_id,ip,branch_id,description,type_id,create_date) 
    OUTPUT Inserted.id
    VALUES (@ticket_no,@user_id,@ip,@branch_id,@description,1,GETDATE())
    `, parameters)

    return insert;
}

module.exports.getRepairListBuildingByTickid = async (ticketId) => {
    let parameters = [
        { name: "ticket_no", sqltype: mssql.VarChar, value: ticketId }
    ]
    let result = query(
        `SELECT rt.ticket_no FROM repair_list rt WHERE rt.ticket_no = @ticket_no AND rt.type_id =2`, parameters)
    return result;

}

module.exports.createRepairBuilding = async (ticket_no, user_id, branch_id, description) => {
    let parameters = [
        { name: "ticket_no", sqltype: mssql.VarChar, value: ticket_no },
        { name: "user_id", sqltype: mssql.Int, value: user_id },
        { name: "branch_id", sqltype: mssql.Int, value: branch_id },
        { name: "description", sqltype: mssql.VarChar, value: description }
    ]
    let insert = await query(
        `INSERT INTO repair_list 
    (ticket_no,user_id,branch_id,description,type_id,create_date) 
    OUTPUT Inserted.id
    VALUES (@ticket_no,@user_id,@branch_id,@description,2,GETDATE())
    `, parameters)

    return insert;
}