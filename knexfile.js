require('dotenv').config();

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
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      ssl: {
        ca: process.env.DB_CERT,
      },
    },
    migrations: {
      tableName: process.env.DB_MIGRATIONS_TABLE,
    },
    seeds: {
      directory: './seeds/development',
    },
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      ssl: {
        ca: process.env.DB_CERT,
      },
    },
    migrations: {
      tableName: process.env.DB_MIGRATIONS_TABLE,
    },
    seeds: {
      directory: './seeds/production',
    },
  },
};
