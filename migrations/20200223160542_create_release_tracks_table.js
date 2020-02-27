exports.up = function(knex, Promise) {
  return knex.schema.createTable('release_tracks', function(table) {
    table.increments();
    table
      .integer('number')
      .unsigned()
      .notNullable();
    table.string('title').notNullable();
    table.string('slug').notNullable();
    table
      .integer('disc_id')
      .unsigned()
      .notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('release_tracks');
};
