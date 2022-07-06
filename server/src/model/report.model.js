const query = require("./_database");
const mssql = require("mssql");

module.exports.getReportRepair = async (year, month, type_id, admin_id) => {
  let parameters = [
    { name: "month", sqltype: mssql.Int, value: parseInt(month) },
    { name: "year", sqltype: mssql.Int, value: parseInt(year) },
    { name: "type_id", sqltype: mssql.Int, value: type_id },
    { name: "admin_id", sqltype: mssql.Int, value: admin_id },
  ];
  let sql = `
    SELECT
        COUNT(CASE WHEN status_id = 1 then 1 end) as pending, 
        COUNT(CASE WHEN status_id = 2 then 1 end) as process,
        COUNT(CASE WHEN status_id = 3 then 1 end) as success,
        COUNT(CASE WHEN status_id = 4 then 1 end) as reject,
        COUNT(id) as total
        FROM repair_list
        WHERE MONTH(create_date) = @month
        AND YEAR(create_date) = @year
        AND type_id = @type_id
    `;

  return await query(sql, parameters);
};

module.exports.GetReportAdminRating = async (year, month, type_id, admin_id) => {
  let parameters = [
    { name: "month", sqltype: mssql.Int, value: parseInt(month) },
    { name: "year", sqltype: mssql.Int, value: parseInt(year) },
    { name: "admin_id", sqltype: mssql.Int, value: admin_id },
    { name: "type_id", sqltype: mssql.Int, value: type_id },
  ];
  let sql = `
    with t1 as (
			SELECT rt.admin_id, u.TUserName as admin_name, SUM(rt.rating) as sum_rating
			FROM repair_list rt
			INNER JOIN tb_users u ON u.id = rt.admin_id
      AND MONTH(rt.create_date) = @month
      AND YEAR(rt.create_date) = @year
      AND rt.type_id = @type_id
			GROUP BY rt.admin_id, u.TUserName
		)
		select u.id, u.TUserName as admin_name, t1.sum_rating, u.image
		from tb_users u
		left join t1 ON t1.admin_id = u.id
		where u.role =2 
    order by u.TUserName ASC
  `;

  return await query(sql, parameters);
};
