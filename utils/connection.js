const mysql = require("mysql2");

//Connect to Database
var connection = mysql.createConnection({

    host: `localhost:3306`,
    port: 3306,
    user: `root`,
    password: `Dakota2020`,
    //socketPath: 'mysql-socket-path'/Applications/MAMP/tmp/mysql/mysql.sock,
    database: `employee_tracker_db`,
});

connection.connect(function (err) {

    if (err) throw err;
    console.log(`connected as id ` + connection.threadId + `\n`);
});

module.exports = connection;

