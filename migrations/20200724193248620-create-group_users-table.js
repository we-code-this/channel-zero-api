exports.up = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS "group_users" (
      "id" int unsigned NOT NULL AUTO_INCREMENT,
      "group_id" int unsigned NOT NULL,
      "user_id" int unsigned NOT NULL,
      "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp NULL DEFAULT NULL,
      PRIMARY KEY ("id")
    )
  `);
};

exports.down = async (db) => {
  await db.query(`DROP TABLE IF EXISTS "group_users"`);
};
