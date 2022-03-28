const mysqlDB = require("mysql");

class MyDatabase {
    constructor(conf) {
        this.connection = mysqlDB.createConnection(conf);
    }
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) {
                    console.log(err.sql);
                    console.log("");
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}
module.exports = MyDatabase;


const con = new MyDatabase({
    host: `ble5mmo2o5v9oouq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com`,
    user: `yzfaskp0hzyk4j76`,
    password: `snjgx1limgrpik3v`,
    port: `3306`,
    database: `fgcb3fjdlgn6zikd`,
});

module.exports = con;
