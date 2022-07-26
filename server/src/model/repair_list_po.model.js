const query = require("./_database");
const mssql = require("mssql");

module.exports.getRepairPoItList = async (id) => {
  let parameters = [
    { name: "id", sqltype: mssql.Int, value: id },
  ];
  let sql = `
  SELECT rt.id, rt.ticket_no, FORMAT (rt.create_date, 'yyyy-MM-dd HH:mm:ss') as create_date, u.TUserName, u.ExtNo, rt.ip
  ,rt.description,ua.TUserName as admin_name, remark, img_repair, po_approve, up.TUserName as po_name, po_number
  , FORMAT (rt.po_date, 'yyyy-MM-dd HH:mm:ss') as po_date, img_po, img_inv, inv_number
  FROM repair_list rt
  Left join tb_users u On u.id = rt.user_id
  Left join tb_users ua On ua.id = rt.admin_id
  left join tb_users up On up.id = rt.po_id
  Left join tb_department d On d.id = rt.dep_id
  Left join tb_status s ON s.id =rt.status_id
  Left join tb_type t ON t.id=rt.type_id
  Left join tb_branch b ON b.id = rt.branch_id
  WHERE rt.type_id = 1
  AND rt.expence_id in (2,3,4)
    `;

  if (id) {
    sql += ` AND rt.id = @id`;
  }

  sql += ` ORDER BY rt.id DESC `;
  let user = await query(sql, parameters);
  return user;
};


module.exports.updateRepairPo = async (userid, id, body) => {
  let parameters = [
    { name: "po_id", sqltype: mssql.Int, value: userid },
    { name: "po_approve", sqltype: mssql.Int, value: body?.po_approve },
    { name: "po_number", sqltype: mssql.VarChar, value: body?.po_number },
    { name: "po_date", sqltype: mssql.VarChar, value: body?.po_date },
    { name: "img_po", sqltype: mssql.VarChar, value: body?.img_po },
    { name: "inv_number", sqltype: mssql.VarChar, value: body?.inv_number },
    { name: "inv_date", sqltype: mssql.VarChar, value: body?.inv_date },
    { name: "img_inv", sqltype: mssql.VarChar, value: body?.img_inv },
    { name: "id", sqltype: mssql.Int, value: id },
  ];

  let sql = `
        UPDATE repair_list
        SET po_id = @po_id,
            po_approve = @po_approve,
            po_number = @po_number,
            po_date = @po_date,
            img_po = @img_po,
            inv_number = @inv_number,
            inv_date = @inv_date,
            img_inv = @img_inv
        OUTPUT INSERTED.*
        WHERE Id = @Id
    `;

  let update = await query(sql, parameters);
  return update;
};


///////////////////

module.exports.getRepairItListLogs = async (userid, roleId, id) => {
  let parameters = [
    { name: "userid", sqltype: mssql.Int, value: userid },
    { name: "id", sqltype: mssql.Int, value: id },
  ];

  let sql = `
    SELECT rt.id, rt.ticket_no, FORMAT (rt.create_date, 'yyyy-MM-dd HH:mm:ss') as create_date, u.TUserName, u.ExtNo, rt.ip
    , d.name as depart_name,rt.description,ua.TUserName as admin_name,rt.remark,s.name as status, ex.name expence_id, rt.status_id, rt.comment
    , tp.name topic_id,  FORMAT (rt.close_date, 'yyyy-MM-dd HH:mm:ss') as close_date, img_repair
    , b.name as branch
    FROM repair_list_logs rt
    Left join tb_users u On u.id = rt.user_id
    Left join tb_users ua On ua.id = rt.admin_id
    Left join tb_department d On d.id = rt.dep_id
    Left join tb_status s ON s.id =rt.status_id
    Left join tb_type t ON t.id=rt.type_id
    Left join tb_branch b ON b.id = rt.branch_id
    Left join tb_topic  tp ON tp.id = rt.topic_id 
    Left join tb_expences  ex ON ex.id = rt.expence_id 
    WHERE rt.type_id = 1
    `;


  if (roleId === 1) {
    sql += `    
        AND rt.user_id = @userid
    `;
  }

  if (id) {
    sql += ` AND rt.id = @id`;
  }

  sql += ` ORDER BY ticket_no DESC, create_date DESC `;
  let user = await query(sql, parameters);
  return user;
};

module.exports.getRepairBuiList = async (userid, roleId, id) => {
  let parameters = [
    { name: "userid", sqltype: mssql.Int, value: userid },
    { name: "id", sqltype: mssql.Int, value: id },
  ];
  let sql = `
        SELECT rt.id, rt.ticket_no, FORMAT (rt.create_date, 'yyyy-MM-dd HH:mm:ss') as create_date, u.TUserName, u.ExtNo
        , d.name as depart_name,rt.description,ua.TUserName as admin_name,rt.remark,s.name as status, rt.expence_id, rt.status_id, rt.comment
        , rt.topic_id,  FORMAT (rt.close_date, 'yyyy-MM-dd HH:mm:ss') as close_date, img_repair
        , b.name as branch, rt.rating
        FROM repair_list rt
        Left join tb_users u ON u.id = rt.user_id
        Left join tb_department d ON d.id =rt.dep_id
        Left join tb_branch b ON b.id = rt.branch_id
        Left join tb_users ua ON ua.id = rt.admin_id
        Left join tb_status s ON s.id = rt.status_id
        WHERE rt.type_id = 2
    `;
  if (roleId === 1) {
    sql += `    
        AND rt.user_id = @userid
    `;
  }

  if (id) {
    sql += ` AND rt.id = @id`;
  }

  sql += ` ORDER BY rt.id DESC `;
  let user = await query(sql, parameters);
  return user;
};

module.exports.getRepairBuildingListLogs = async (userid, roleId, id) => {
  let parameters = [
    { name: "userid", sqltype: mssql.Int, value: userid },
    { name: "id", sqltype: mssql.Int, value: id },
  ];

  let sql = `
    SELECT rt.id, rt.ticket_no, FORMAT (rt.create_date, 'yyyy-MM-dd HH:mm:ss') as create_date, u.TUserName, u.ExtNo
    , d.name as depart_name,rt.description,ua.TUserName as admin_name,rt.remark,s.name as status, rt.expence_id, rt.status_id, rt.comment
    , rt.topic_id,  FORMAT (rt.close_date, 'yyyy-MM-dd HH:mm:ss') as close_date, img_repair
    , b.name as branch
    FROM repair_list_logs rt
    Left join tb_users u On u.id = rt.user_id
    Left join tb_users ua On ua.id = rt.admin_id
    Left join tb_department d On d.id = rt.dep_id
    Left join tb_status s ON s.id =rt.status_id
    Left join tb_type t ON t.id=rt.type_id
    Left join tb_branch b ON b.id = rt.branch_id
    WHERE rt.type_id = 2
    `;

  if (roleId === 1) {
    sql += `    
        AND rt.user_id = @userid
    `;
  }

  if (id) {
    sql += ` AND rt.id = @id`;
  }

  sql += ` ORDER BY ticket_no DESC, create_date DESC `;
  let user = await query(sql, parameters);
  return user;
};

module.exports.getRepairListBuildingByTickid = async (ticketId) => {
  let parameters = [
    { name: "ticket_no", sqltype: mssql.VarChar, value: ticketId },
  ];
  let result = query(
    `SELECT rt.ticket_no FROM repair_list rt WHERE rt.ticket_no = @ticket_no AND rt.type_id =2`,
    parameters
  );
  return result;
};

module.exports.createRepairBuilding = async (
  ticket_no,
  user_id,
  branch_id,
  description
) => {
  let parameters = [
    { name: "ticket_no", sqltype: mssql.VarChar, value: ticket_no },
    { name: "user_id", sqltype: mssql.Int, value: user_id },
    { name: "branch_id", sqltype: mssql.Int, value: branch_id },
    { name: "description", sqltype: mssql.VarChar, value: description },
  ];
  let insert = await query(
    `INSERT INTO repair_list 
    (ticket_no,user_id,branch_id,description,type_id,create_date) 
    OUTPUT Inserted.id
    VALUES (@ticket_no,@user_id,@branch_id,@description,2,GETDATE())
    `,
    parameters
  );

  return insert;
};

module.exports.updateRating = async (repair_id, rating, comment_rating) => {
  let parameters = [
    { name: "Id", sqltype: mssql.Int, value: repair_id },
    { name: "rating", sqltype: mssql.Int, value: rating },
    { name: "comment_rating", sqltype: mssql.VarChar, value: comment_rating },
  ];

  let result = await query(
    `
    UPDATE repair_list
    SET rating = @rating,
    comment_rating = @comment_rating
    OUTPUT INSERTED.*
    WHERE Id = @Id
    AND rating IS NULL
    `,
    parameters
  );

  return result;
};
