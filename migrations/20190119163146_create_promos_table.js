exports.up = function(knex, Promise) {
  return knex.schema.createTable("promos", function(table) {
    table.increments();
    table.string("name").notNullable();
    table.string("url").notNullable();
    table.string("filename").notNullable();
    table.string("location").notNullable();
    table
      .boolean("published")
      .notNullable()
      .defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("promos");
};
