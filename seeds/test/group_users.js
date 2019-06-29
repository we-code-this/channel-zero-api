exports.seed = function(knex, Promise) {
  return knex('group_users')
    .del()
    .then(function() {
      return knex('group_users').insert([
        {
          id: 1,
          group_id: 1,
          user_id: 1,
          created_at: '2019-01-19 12:00:00'
        }
      ]);
    });
};
