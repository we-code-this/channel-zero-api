exports.up = function (knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('reset_token').after('password').nullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('reset_token');
  });
};
