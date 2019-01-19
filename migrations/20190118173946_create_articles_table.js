exports.up = function(knex, Promise) {
  return knex.schema.createTable("articles", function(table) {
    table.increments();
    table.string("url").notNullable();
    table.string("title").notNullable();
    table.text("summary").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("articles");
};
