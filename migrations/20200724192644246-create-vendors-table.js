exports.up = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS "vendors" (
      "id" int unsigned NOT NULL AUTO_INCREMENT,
      "user_id" int unsigned NOT NULL,
      "name" varchar(255) NOT NULL,
      "icon_class" varchar(255) NOT NULL,
      "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp NULL DEFAULT NULL,
      PRIMARY KEY ("id")
    )
  `);
};

exports.down = async (db) => {
  await db.query(`DROP TABLE IF EXISTS "vendors"`);
};
