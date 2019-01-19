require("dotenv").config();

module.exports = {
  test: {
    client: "sqlite3",
    connection: {
      filename: "./test/test.sqlite3"
    }
  },

  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    migrations: {
      tableName: process.env.DB_MIGRATIONS_TABLE
    }
  },

  production: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    migrations: {
      tableName: process.env.DB_MIGRATIONS_TABLE
    }
  }
};
