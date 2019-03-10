
exports.up = function(knex, Promise) {
  return knex.schema.createTable("artist_images", function(table) {
    table.increments();
    table
      .integer("artist_id")
      .unsigned()
      .notNullable();
    table.string("filename").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").nullable();
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("artist_images");
};
