const mysql = require('mysql');

const DB_HOST = 'localhost';
const DB_PORT = 3306;
const DB_NAME = 'pbcm'

const dbConnection = mysql.createConnection({
  host: DB_HOST,
  user: "root",
  port: DB_PORT,
  password: "pass123",
  database: DB_NAME
});

const dbPool = mysql.createPool({
  limit: 100,
  host: DB_HOST,
  user: "root",
  port: DB_PORT,
  password: 'pass123',
  database: DB_NAME
});

const connectDB = async () => {
  await dbConnection.connect((error) => {
    if (error) throw error;
    console.log(`Connected to MySQL database (pbcm) at ${DB_HOST}:${DB_PORT}!`);
  });
}

const dbQuery = (query, params) => new Promise((resolve, reject) => {
  dbPool.query(query, params, (error, result) => {
    if (error) return reject(error);

    return resolve(result);
  })
})

module.exports = {
  connectDB,
  dbQuery
}