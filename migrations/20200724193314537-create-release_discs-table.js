exports.up = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS "release_discs" (
      "id" int unsigned NOT NULL AUTO_INCREMENT,
      "sort" int NOT NULL DEFAULT '0',
      "name" varchar(255) NOT NULL DEFAULT 'Disc 1',
      "release_id" int unsigned NOT NULL,
      "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp NULL DEFAULT NULL,
      PRIMARY KEY ("id")
    )
  `);
};

exports.down = async (db) => {
  await db.query(`DROP TABLE IF EXISTS "release_discs"`);
};
