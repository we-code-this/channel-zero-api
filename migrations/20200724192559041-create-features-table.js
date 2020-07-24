exports.up = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS "features" (
      "id" int unsigned NOT NULL AUTO_INCREMENT,
      "user_id" int unsigned NOT NULL,
      "article_id" int unsigned NOT NULL,
      "video_id" int unsigned NOT NULL,
      "published" tinyint(1) NOT NULL DEFAULT '0',
      "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp NULL DEFAULT NULL,
      PRIMARY KEY ("id")
    )
  `);
};

exports.down = async (db) => {
  await db.query(`DROP TABLE IF EXISTS "features"`);
};
