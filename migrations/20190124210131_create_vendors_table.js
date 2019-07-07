exports.up = function(knex, Promise) {
  return knex.schema.createTable('vendors', function(table) {
    table.increments();
    table
      .integer('user_id')
      .unsigned()
      .notNullable();
    table.string('name').notNullable();
    table.string('icon_class').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('vendors');
};
