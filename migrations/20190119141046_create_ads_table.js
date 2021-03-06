exports.up = function(knex, Promise) {
  return knex.schema.createTable('ads', function(table) {
    table.increments();
    table
      .integer('user_id')
      .unsigned()
      .notNullable();
    table.string('url').notNullable();
    table.string('alt').notNullable();
    table.string('desktop_filename').notNullable();
    table.string('mobile_filename').notNullable();
    table
      .boolean('published')
      .notNullable()
      .defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('ads');
};
