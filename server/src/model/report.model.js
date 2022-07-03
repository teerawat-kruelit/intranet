const query = require("./_database");
const mssql = require("mssql");

module.exports.getReportRepair = async (year, month, type_id) => {
  let parameters = [
    { name: "month", sqltype: mssql.Int, value: parseInt(month) },
    { name: "year", sqltype: mssql.Int, value: parseInt(year) },
    { name: "type_id", sqltype: mssql.Int, value: type_id },
  ];
  let sql = `
    SELECT
        COUNT(CASE WHEN status_id = 1 then 1 end) as pending, 
        COUNT(CASE WHEN status_id = 2 then 1 end) as process,
        COUNT(CASE WHEN status_id = 3 then 1 end) as success,
        COUNT(CASE WHEN status_id = 4 then 1 end) as reject
        FROM repair_list
        WHERE MONTH(create_date) = @month
        AND YEAR(create_date) = @year
        AND type_id = @type_id
    `;

  return await query(sql, parameters);
};
