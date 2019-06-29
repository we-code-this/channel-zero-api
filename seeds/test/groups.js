exports.seed = function(knex, Promise) {
  return knex('groups')
    .del()
    .then(function() {
      return knex('groups').insert([
        {
          id: 1,
          name: 'Admin',
          slug: 'admin',
          created_at: '2019-02-07 12:00:00'
        }
      ]);
    });
};
