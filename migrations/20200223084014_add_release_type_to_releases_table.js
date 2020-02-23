exports.up = function(knex, Promise) {
  return knex.schema.table('releases', function(table) {
    table
      .string('release_type')
      .after('published')
      .defaultTo('album');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('releases', function(table) {
    table.dropColumn('release_type');
  });
};
