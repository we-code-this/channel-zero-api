exports.up = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS "release_tracks" (
      "id" int unsigned NOT NULL AUTO_INCREMENT,
      "number" int unsigned NOT NULL,
      "title" varchar(255) NOT NULL,
      "slug" varchar(255) NOT NULL,
      "disc_id" int unsigned NOT NULL,
      "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp NULL DEFAULT NULL,
      PRIMARY KEY ("id")
    )
  `);
};

exports.down = async (db) => {
  await db.query(`DROP TABLE IF EXISTS "release_tracks"`);
};
