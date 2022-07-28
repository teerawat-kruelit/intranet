const query = require("./_database");
const mssql = require("mssql");

module.exports.getRepairAccItList = async (id) => {
  let parameters = [{ name: "id", sqltype: mssql.Int, value: id }];
  let sql = `
  SELECT rt.id, rt.ticket_no, FORMAT (rt.create_date, 'yyyy-MM-dd HH:mm:ss') as create_date, u.TUserName, u.ExtNo, rt.ip
  ,rt.description,ua.TUserName as admin_name, remark, rt.po_number, img_po, img_inv, rt.acc_approve, fp.TUserName as acc_name, acc_acc
  , FORMAT (rt.acc_date, 'yyyy-MM-dd HH:mm:ss') as acc_date, img_acc, rt.type_id
  FROM repair_list rt
  Left join tb_users u On u.id = rt.user_id
  Left join tb_users ua On ua.id = rt.admin_id
  left join tb_users fp On fp.id = rt.acc_id
  Left join tb_department d On d.id = rt.dep_id
  Left join tb_status s ON s.id =rt.status_id
  Left join tb_type t ON t.id=rt.type_id
  Left join tb_branch b ON b.id = rt.branch_id
  WHERE rt.po_approve = 1
  AND rt.type_id = 1
  AND rt.fin_approve = 1
  AND rt.expence_id in (2,3,4,6)
    `;

  if (id) {
    sql += ` AND rt.id = @id`;
  }

  sql += ` ORDER BY rt.id DESC `;
  let user = await query(sql, parameters);
  return user;
};

module.exports.getRepairAccBuildingList = async (id) => {
  let parameters = [{ name: "id", sqltype: mssql.Int, value: id }];
  let sql = `
  SELECT rt.id, rt.ticket_no, FORMAT (rt.create_date, 'yyyy-MM-dd HH:mm:ss') as create_date, u.TUserName, u.ExtNo, rt.ip
  ,rt.description,ua.TUserName as admin_name, remark, rt.po_number, img_po, img_inv, rt.acc_approve, fp.TUserName as acc_name, acc_acc
  , FORMAT (rt.acc_date, 'yyyy-MM-dd HH:mm:ss') as acc_date, img_acc, rt.type_id
  FROM repair_list rt
  Left join tb_users u On u.id = rt.user_id
  Left join tb_users ua On ua.id = rt.admin_id
  left join tb_users fp On fp.id = rt.acc_id
  Left join tb_department d On d.id = rt.dep_id
  Left join tb_status s ON s.id =rt.status_id
  Left join tb_type t ON t.id=rt.type_id
  Left join tb_branch b ON b.id = rt.branch_id
  WHERE rt.po_approve = 1
  AND rt.type_id = 2
  and rt.fin_approve = 1
  AND rt.expence_id in (2,3,4,6)
    `;

  if (id) {
    sql += ` AND rt.id = @id`;
  }

  sql += ` ORDER BY rt.id DESC `;
  let user = await query(sql, parameters);
  return user;
};

module.exports.getRepairAccDetail = async (id) => {
  let parameters = [{ name: "id", sqltype: mssql.Int, value: id }];
  let sql = `
  SELECT rt.id, rt.ticket_no, FORMAT (rt.create_date, 'yyyy-MM-dd HH:mm:ss') as create_date, u.TUserName, u.ExtNo, rt.ip
  ,rt.description,ua.TUserName as admin_name, remark, img_repair, fin_approve, fp.TUserName as fin_name, fin_number
  , FORMAT (rt.fin_date, 'yyyy-MM-dd HH:mm:ss') as fin_date, img_fin, rt.type_id, rt.fin_recipient
  FROM repair_list rt
  Left join tb_users u On u.id = rt.user_id
  Left join tb_users ua On ua.id = rt.admin_id
  left join tb_users fp On fp.id = rt.fin_id
  Left join tb_department d On d.id = rt.dep_id
  Left join tb_status s ON s.id =rt.status_id
  Left join tb_type t ON t.id=rt.type_id
  Left join tb_branch b ON b.id = rt.branch_id
  AND rt.expence_id in (2,3,4,6)
    `;

  if (id) {
    sql += ` AND rt.id = @id`;
  }

  sql += ` ORDER BY rt.id DESC `;

  let user = await query(sql, parameters);
  return user;
};

module.exports.updateRepairAcc = async (userid, id, body) => {
  let parameters = [
    { name: "acc_id", sqltype: mssql.Int, value: userid },
    { name: "acc_approve", sqltype: mssql.Int, value: body?.acc_approve },
    { name: "acc_acc", sqltype: mssql.VarChar, value: body?.acc_acc },
    { name: "acc_date", sqltype: mssql.VarChar, value: body?.acc_date },
    { name: "img_acc", sqltype: mssql.VarChar, value: body?.img_acc },
    { name: "id", sqltype: mssql.Int, value: id },
  ];

  let sql = `
        UPDATE repair_list
        SET acc_id = @acc_id,
            acc_approve = @acc_approve,
            acc_acc = @acc_acc,
            acc_date = @acc_date,
            img_acc = @img_acc
        OUTPUT INSERTED.*
        WHERE Id = @Id
    `;

  let update = await query(sql, parameters);
  return update;
};
