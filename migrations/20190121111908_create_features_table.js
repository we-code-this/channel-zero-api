exports.up = function(knex, Promise) {
  return knex.schema.createTable('features', function(table) {
    table.increments();
    table
      .integer('user_id')
      .unsigned()
      .notNullable();
    table
      .integer('article_id')
      .unsigned()
      .notNullable();
    table
      .integer('video_id')
      .unsigned()
      .notNullable();
    table
      .boolean('published')
      .notNullable()
      .defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('features');
};
