exports.seed = function(knex, Promise) {
  return knex('users')
    .select()
    .where({
      email: process.env.API_ADMIN_USER,
      username: 'admin'
    })
    .then(function(rows) {
      if (rows.length === 0) {
        return knex('users').insert(
          {
            id: 1,
            email: process.env.API_ADMIN_USER,
            username: 'admin',
            password: process.env.API_ADMIN_PASSWORD,
            created_at: '2019-02-07 12:00:00'
          }
        );
      }
    });
};
