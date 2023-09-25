const mysql = require('mysql2/promise');
const { DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE } = require('../config')
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

// 使用连接池获取连接
const getConnection = async () => {
  const connection = await pool.getConnection();
  return connection;
};

module.exports = getConnection