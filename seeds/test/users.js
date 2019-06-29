exports.seed = function(knex, Promise) {
  return knex('users')
    .del()
    .then(function() {
      return knex('users').insert([
        {
          id: 1,
          email: 'user@example.com',
          username: 'user',
          password:
            '$2b$10$CpiYkz1.Kiz9RNtW7ITioexGF7/lEoS2/bYVewLsjIO8wB.2oLzfm',
          created_at: '2019-02-07 12:00:00'
        }
      ]);
    });
};
