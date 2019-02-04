exports.up = function(knex, Promise) {
  return knex.schema.createTable("endorsements", function(table) {
    table.increments();
    table.string("review").notNullable();
    table.string("reviewer").notNullable();
    table.string("url").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("endorsements");
};
