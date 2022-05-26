const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'CodingBoot2022!',
    database: 'employee'
});

module.exports = db;