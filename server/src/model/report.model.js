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
        AND admin_id = @admin_id
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
        SELECT admin_id, SUM(rating) as sum_rating
        FROM repair_list
        WHERE admin_id = @admin_id
        AND MONTH(create_date) = @month
        AND YEAR(create_date) = @year
        AND type_id = @type_id
        GROUP BY admin_id
    `;

  return await query(sql, parameters);
};
