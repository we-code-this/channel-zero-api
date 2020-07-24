exports.up = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS "releases" (
      "id" int unsigned NOT NULL AUTO_INCREMENT,
      "user_id" int unsigned NOT NULL,
      "artist_id" int unsigned NOT NULL,
      "label_id" int unsigned NOT NULL,
      "title" varchar(255) NOT NULL,
      "slug" varchar(255) NOT NULL,
      "description" text,
      "catalog_number" varchar(255) DEFAULT NULL,
      "release_date" date DEFAULT NULL,
      "filename" varchar(255) NOT NULL,
      "published" tinyint(1) NOT NULL DEFAULT '0',
      "release_type" varchar(255) DEFAULT 'album',
      "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp NULL DEFAULT NULL,
      PRIMARY KEY ("id")
    )
  `);
};

exports.down = async (db) => {
  await db.query(`DROP TABLE IF EXISTS "releases"`);
};
