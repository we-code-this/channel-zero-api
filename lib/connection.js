require('dotenv').config();

let db;

if (process.env.NODE_ENV === 'test') {
  const Database = require('better-sqlite3');
  db = new Database(':memory:');

  db.query = (sql) => {
    sql = sql.replace(' AUTO_INCREMENT', '');
    db.exec(sql);
  };

  db.quit = () => {
    db.close();
  };
} else {
  db = require('serverless-mysql')({
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
}

module.exports = db;
