exports.up = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS "artists" (
      "id" int unsigned NOT NULL AUTO_INCREMENT,
      "user_id" int unsigned NOT NULL,
      "name" varchar(255) NOT NULL,
      "slug" varchar(255) NOT NULL,
      "description" text,
      "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp NULL DEFAULT NULL,
      PRIMARY KEY ("id")
    )
  `);
};

exports.down = async (db) => {
  await db.query(`DROP TABLE IF EXISTS "artists"`);
};
