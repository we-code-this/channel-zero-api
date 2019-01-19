exports.up = function(knex, Promise) {
  return knex.schema.createTable("ads", function(table) {
    table.increments();
    table.string("url").notNullable();
    table.string("alt").notNullable();
    table.string("desktop_filename").notNullable();
    table.string("mobile_filename").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("ads");
};
