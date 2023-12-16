const mysql = require('mysql2');

const config = {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'hotwaxdb'
};
const pool = mysql.createPool(config);

const promisePool = pool.promise();

console.log("database connected");

module.exports = promisePool;