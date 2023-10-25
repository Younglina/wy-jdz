const dotenv = require('dotenv');

dotenv.config()
const { DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE, COS_KEY, COS_ID } = process.env;

module.exports = {
  DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE, COS_KEY, COS_ID
}