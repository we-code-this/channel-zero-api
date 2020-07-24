exports.up = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS "artist_images" (
      "id" int unsigned NOT NULL AUTO_INCREMENT,
      "artist_id" int unsigned NOT NULL,
      "filename" varchar(255) NOT NULL,
      "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp NULL DEFAULT NULL,
      PRIMARY KEY ("id")
    )
  `);
};

exports.down = async (db) => {
  await db.query(`DROP TABLE IF EXISTS "artist_images"`);
};
