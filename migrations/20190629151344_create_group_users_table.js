exports.up = function(knex, Promise) {
  return knex.schema.createTable('group_users', function(table) {
    table.increments();
    table
      .integer('group_id')
      .unsigned()
      .notNullable();
    table
      .integer('user_id')
      .unsigned()
      .notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('group_users');
};
