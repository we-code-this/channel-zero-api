exports.up = function(knex, Promise) {
  return knex.schema.createTable('labels', function(table) {
    table.increments();
    table
      .integer('user_id')
      .unsigned()
      .notNullable();
    table.string('name').notNullable();
    table.string('slug').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('labels');
};
