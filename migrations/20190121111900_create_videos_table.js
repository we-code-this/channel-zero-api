exports.up = function(knex, Promise) {
  return knex.schema.createTable("videos", function(table) {
    table.increments();
    table.string("src").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("videos");
};
