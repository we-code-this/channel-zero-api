exports.seed = function(knex, Promise) {
  return knex('group_users')
    .select()
    .where({
      group_id: 1,
      user_id: 1
    })
    .then(function(rows) {
      if (rows.length === 0) {
        return knex('group_users').insert([
          {
            id: 1,
            group_id: 1,
            user_id: 1
          }
        ]);
      }
    });
};
