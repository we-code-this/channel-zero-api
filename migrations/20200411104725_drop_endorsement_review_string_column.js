exports.up = function (knex, Promise) {
  return knex.schema.table('endorsements', function (table) {
    table.dropColumn('review');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('endorsements', function (table) {
    table
      .string('review')
      .after('related_id')
      .notNullable()
      .default('review required');
  });
};
