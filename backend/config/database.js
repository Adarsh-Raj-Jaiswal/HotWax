const mysql = require('mysql2');

const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};

const connectDatabase = () => {

    const pool = mysql.createPool(config).promise();
    console.log('Database is working')

    return pool;
}

module.exports = connectDatabase;