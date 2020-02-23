exports.up = function(knex, Promise) {
  return knex.schema.createTable('release_discs', function(table) {
    table.increments();
    table
      .integer('sort')
      .notNullable()
      .defaultTo(0);
    table
      .string('name')
      .notNullable()
      .defaultTo('Disc 1');
    table
      .integer('release_id')
      .unsigned()
      .notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('release_discs');
};
