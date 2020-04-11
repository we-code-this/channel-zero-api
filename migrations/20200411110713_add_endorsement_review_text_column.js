exports.up = function (knex, Promise) {
  return knex.schema.table('endorsements', function (table) {
    table
      .text('review')
      .after('related_id')
      .notNullable()
      .default('review required');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('endorsements', function (table) {
    table.dropColumn('review');
  });
};
