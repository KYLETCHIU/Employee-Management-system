const mysql = require("mysql");

//Connect to Database
var connection = mysql.createConnection({

    host: `localhost`,
    port: 3306,
    user: `root`,
    password: `Dakota2020`,
    database: `employee_tracker_db`
});

connection.connect(function (err) {

    if (err) throw err;
    console.log(`connected as id ` + connection.threadId + `\n`);
});

module.exports = connection;

