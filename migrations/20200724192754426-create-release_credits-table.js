exports.up = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS "release_credits" (
      "id" int unsigned NOT NULL AUTO_INCREMENT,
      "release_id" int unsigned NOT NULL,
      "label" varchar(255) NOT NULL,
      "value" varchar(255) NOT NULL,
      "url" varchar(255) DEFAULT NULL,
      "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp NULL DEFAULT NULL,
      PRIMARY KEY ("id")
    )
  `);
};

exports.down = async (db) => {
  await db.query(`DROP TABLE IF EXISTS "release_credits"`);
};
