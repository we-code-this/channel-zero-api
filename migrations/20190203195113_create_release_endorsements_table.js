exports.up = function(knex, Promise) {
  return knex.schema.createTable("release_endorsements", function(table) {
    table.increments();
    table
      .integer("release_id")
      .unsigned()
      .notNullable();
    table
      .integer("endorsement_id")
      .unsigned()
      .notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("release_endorsements");
};
