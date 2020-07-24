exports.up = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS "users" (
      "id" int unsigned NOT NULL AUTO_INCREMENT,
      "email" varchar(255) NOT NULL,
      "username" varchar(255) NOT NULL,
      "password" varchar(255) NOT NULL,
      "reset_token" varchar(255) DEFAULT NULL,
      "first_name" varchar(255) DEFAULT NULL,
      "last_name" varchar(255) DEFAULT NULL,
      "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp NULL DEFAULT NULL,
      PRIMARY KEY ("id")
    )
  `);
};

exports.down = async (db) => {
  await db.query(`DROP TABLE IF EXISTS "users"`);
};
