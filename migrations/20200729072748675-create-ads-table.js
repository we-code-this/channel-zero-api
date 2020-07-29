exports.up = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS "ads" (
      "id" int unsigned NOT NULL AUTO_INCREMENT,
      "user_id" int unsigned NOT NULL,
      "url" varchar(255) NOT NULL,
      "alt" varchar(255) NOT NULL,
      "desktop_filename" varchar(255) NOT NULL,
      "mobile_filename" varchar(255) NOT NULL,
      "published" tinyint(1) NOT NULL DEFAULT '0',
      "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp NULL DEFAULT NULL,
      PRIMARY KEY ("id")
    )
  `);
};

exports.down = async (db) => {
  await db.query(`DROP TABLE IF EXISTS "ads"`);
};
