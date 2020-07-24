require('dotenv').config();

const db = require('serverless-mysql')({
  config: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: {
      ca: process.env.DB_CERT,
    },
  }
});

module.exports = db;
