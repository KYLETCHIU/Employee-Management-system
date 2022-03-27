const mysql = require("mysql");

//Connect to Database
var connection = mysql.createConnection({

    host: `ble5mmo2o5v9oouq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com`,
    user: `yzfaskp0hzyk4j76`,
    password: `snjgx1limgrpik3v`,
    port: `3306`,
    database: `fgcb3fjdlgn6zikd`,
});

connection.connect(function (err) {

    if (err) throw err;
    console.log(`connected as id ` + connection.threadId + `\n`);
});

module.exports = connection;

