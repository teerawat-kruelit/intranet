const mssql = require('mssql')
const config = require('../../config/database.config')

const executeQuery = (query, parameters) => {
    return new Promise((resolve, reject) => {
        try {
            mssql.connect(config, function (err) {
                if (err) {
                    console.log(err);
                    resolve(false);
                } else {
                    var request = new mssql.Request();

                    parameters.forEach(function (p) {
                        request.input(p.name, p.sqltype, p.value);
                    });

                    request.query(query, function (err, result) {
                        if (err) {
                            console.log(err);
                            resolve(false);
                        } else {
                            // mssql.close();
                            resolve(result.recordset);
                        }
                    });
                }
            });
        } catch (error) {
            console.log(error)
        }
    });
};

module.exports = executeQuery