const query = require("./_database");
const mssql = require("mssql");

module.exports.getRepairPoItList = async (id) => {
  let parameters = [{ name: "id", sqltype: mssql.Int, value: id }];
  let sql = `
  SELECT rt.id, rt.ticket_no, FORMAT (rt.create_date, 'yyyy-MM-dd HH:mm:ss') as create_date, u.TUserName, u.ExtNo, rt.ip
  ,rt.description,ua.TUserName as admin_name, remark, img_repair, po_approve, up.TUserName as po_name, po_number
  , FORMAT (rt.po_date, 'yyyy-MM-dd HH:mm:ss') as po_date, img_po, img_inv, inv_number, rt.type_id
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

module.exports.getRepairPoBuildingList = async (id) => {
  let parameters = [{ name: "id", sqltype: mssql.Int, value: id }];
  let sql = `
  SELECT rt.id, rt.ticket_no, FORMAT (rt.create_date, 'yyyy-MM-dd HH:mm:ss') as create_date, u.TUserName, u.ExtNo
  ,rt.description,ua.TUserName as admin_name, remark, img_repair, po_approve, up.TUserName as po_name, po_number
  , FORMAT (rt.po_date, 'yyyy-MM-dd HH:mm:ss') as po_date, img_po, img_inv, inv_number, rt.type_id
  FROM repair_list rt
  Left join tb_users u On u.id = rt.user_id
  Left join tb_users ua On ua.id = rt.admin_id
  left join tb_users up On up.id = rt.po_id
  Left join tb_department d On d.id = rt.dep_id
  Left join tb_status s ON s.id =rt.status_id
  Left join tb_type t ON t.id=rt.type_id
  Left join tb_branch b ON b.id = rt.branch_id
  WHERE rt.type_id = 2
  AND rt.expence_id in (2,3,4)
    `;

  if (id) {
    sql += ` AND rt.id = @id`;
  }

  sql += ` ORDER BY rt.id DESC `;
  let user = await query(sql, parameters);
  return user;
};

module.exports.getRepairPoDetail = async (id) => {
  let parameters = [{ name: "id", sqltype: mssql.Int, value: id }];
  let sql = `
  SELECT rt.id, rt.ticket_no, FORMAT (rt.create_date, 'yyyy-MM-dd HH:mm:ss') as create_date, u.TUserName, u.ExtNo
  ,rt.description,ua.TUserName as admin_name, remark, img_repair, po_approve, up.TUserName as po_name, po_number
  , FORMAT (rt.po_date, 'yyyy-MM-dd HH:mm:ss') as po_date, img_po, img_inv, inv_number, rt.type_id
  FROM repair_list rt
  Left join tb_users u On u.id = rt.user_id
  Left join tb_users ua On ua.id = rt.admin_id
  left join tb_users up On up.id = rt.po_id
  Left join tb_department d On d.id = rt.dep_id
  Left join tb_status s ON s.id =rt.status_id
  Left join tb_type t ON t.id=rt.type_id
  Left join tb_branch b ON b.id = rt.branch_id
  WHERE rt.expence_id in (2,3,4)
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
