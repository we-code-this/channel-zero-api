exports.up = function(knex, Promise) {
  return knex.schema.table('releases', function(table) {
    table
      .date('release_date')
      .after('catalog_number')
      .nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('releases', function(table) {
    table.dropColumn('release_date');
  });
};
