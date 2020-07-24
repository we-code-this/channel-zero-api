exports.up = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS "articles" (
      "id" int unsigned NOT NULL AUTO_INCREMENT,
      "user_id" int unsigned NOT NULL,
      "title" varchar(255) NOT NULL,
      "slug" varchar(255) NOT NULL,
      "summary" text,
      "description" text NOT NULL,
      "filename" varchar(255) DEFAULT NULL,
      "published" tinyint(1) NOT NULL DEFAULT '0',
      "publish_date" date DEFAULT NULL,
      "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp NULL DEFAULT NULL,
      PRIMARY KEY ("id")
    )
  `);
};

exports.down = async (db) => {
  await db.query(`DROP TABLE IF EXISTS "articles"`);
};
