exports.up = function (knex, Promise) {
  return knex.schema.table('articles', function (table) {
    table.date('publish_date').after('published').nullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('articles', function (table) {
    table.dropColumn('publish_date');
  });
};
