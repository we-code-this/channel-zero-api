exports.up = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS "endorsements" (
      "id" int unsigned NOT NULL AUTO_INCREMENT,
      "user_id" int unsigned NOT NULL,
      "related_id" int unsigned NOT NULL,
      "review" text NOT NULL,
      "reviewer" varchar(255) NOT NULL,
      "url" varchar(255) DEFAULT NULL,
      "type" varchar(255) NOT NULL,
      "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp NULL DEFAULT NULL,
      PRIMARY KEY ("id")
    )
  `);
};

exports.down = async (db) => {
  await db.query(`DROP TABLE IF EXISTS "endorsements"`);
};
