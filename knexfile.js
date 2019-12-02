require('dotenv').config();
let fs = require('fs-extra');

let productionConnection = {};
if (process.env.NODE_ENV === 'production') {
  productionConnection = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: {
      ca: fs.readFileSync(
        '/etc/ssl/certs/' + process.env.DB_CERT_FILENAME,
      ),
    },
  };
}

module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './test/test.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      tableName: process.env.DB_MIGRATIONS_TABLE,
    },
    seeds: {
      directory: './seeds/test',
    },
  },

  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
    },
    migrations: {
      tableName: process.env.DB_MIGRATIONS_TABLE,
    },
    seeds: {
      directory: './seeds/development',
    },
  },

  production: {
    client: 'pg',
    connection: productionConnection,
    migrations: {
      tableName: process.env.DB_MIGRATIONS_TABLE,
    },
    seeds: {
      directory: './seeds/production',
    },
  },
};
