exports.up = function(knex, Promise) {
  return knex.schema.createTable('releases', function(table) {
    table.increments();
    table
      .integer('user_id')
      .unsigned()
      .notNullable();
    table
      .integer('artist_id')
      .unsigned()
      .notNullable();
    table
      .integer('label_id')
      .unsigned()
      .notNullable();
    table.string('title').notNullable();
    table.string('slug').notNullable();
    table.text('description');
    table.string('filename').notNullable();
    table
      .boolean('published')
      .notNullable()
      .defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('releases');
};
