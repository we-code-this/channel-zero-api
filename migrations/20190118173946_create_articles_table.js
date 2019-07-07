exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', function(table) {
    table.increments();
    table
      .integer('user_id')
      .unsigned()
      .notNullable();
    table.string('url').notNullable();
    table.string('title').notNullable();
    table.text('summary').notNullable();
    table
      .boolean('published')
      .notNullable()
      .defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('articles');
};
