exports.up = function(knex, Promise) {
  return knex.schema.table('releases', function(table) {
    table.string('catalog_number').after('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('releases', function(table) {
    table.dropColumn('catalog_number');
  });
};
