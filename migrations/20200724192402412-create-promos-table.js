exports.up = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS "promos" (
      "id" int unsigned NOT NULL AUTO_INCREMENT,
      "user_id" int unsigned NOT NULL,
      "name" varchar(255) NOT NULL,
      "url" varchar(255) NOT NULL,
      "filename" varchar(255) NOT NULL,
      "location" varchar(255) NOT NULL,
      "published" tinyint(1) NOT NULL DEFAULT '0',
      "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp NULL DEFAULT NULL,
      PRIMARY KEY ("id")
    )
  `);
};

exports.down = async (db) => {
  await db.query(`DROP TABLE IF EXISTS "promos"`);
};
