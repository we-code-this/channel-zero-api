exports.seed = function (knex, Promise) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          email: 'user@example.com',
          username: 'user',
          password:
            '$2b$10$CpiYkz1.Kiz9RNtW7ITioexGF7/lEoS2/bYVewLsjIO8wB.2oLzfm',
          created_at: '2019-02-07 12:00:00',
        },
        {
          id: 2,
          email: 'user2@example.com',
          username: 'user2',
          password:
            '$2b$10$CpiYkz1.Kiz9RNtW7ITioexGF7/lEoS2/bYVewLsjIO8wB.2oLzfm',
          created_at: '2019-02-07 12:01:0',
        },
        {
          id: 3,
          email: 'user3@example.com',
          username: 'user3',
          password:
            '$2b$10$CpiYkz1.Kiz9RNtW7ITioexGF7/lEoS2/bYVewLsjIO8wB.2oLzfm',
          created_at: '2019-02-07 12:02:0',
        },
        {
          id: 4,
          email: 'user4@example.com',
          username: 'user4',
          password:
            '$2b$10$CpiYkz1.Kiz9RNtW7ITioexGF7/lEoS2/bYVewLsjIO8wB.2oLzfm',
          created_at: '2019-02-07 12:03:0',
        },
        {
          id: 5,
          email: 'user5@example.com',
          username: 'user5',
          password:
            '$2b$10$CpiYkz1.Kiz9RNtW7ITioexGF7/lEoS2/bYVewLsjIO8wB.2oLzfm',
          created_at: '2019-02-07 12:04:00',
        },
        {
          id: 6,
          email: 'user6@example.com',
          username: 'user6',
          password:
            '$2b$10$CpiYkz1.Kiz9RNtW7ITioexGF7/lEoS2/bYVewLsjIO8wB.2oLzfm',
          created_at: '2019-02-07 12:05:00',
        },
        {
          id: 7,
          email: 'user7@example.com',
          username: 'user7',
          password:
            '$2b$10$CpiYkz1.Kiz9RNtW7ITioexGF7/lEoS2/bYVewLsjIO8wB.2oLzfm',
          created_at: '2019-02-07 12:06:00',
        },
        {
          id: 8,
          email: 'user8@example.com',
          username: 'user8',
          password:
            '$2b$10$CpiYkz1.Kiz9RNtW7ITioexGF7/lEoS2/bYVewLsjIO8wB.2oLzfm',
          created_at: '2019-02-07 12:07:00',
        },
        {
          id: 9,
          email: 'user9@example.com',
          username: 'user9',
          password:
            '$2b$10$CpiYkz1.Kiz9RNtW7ITioexGF7/lEoS2/bYVewLsjIO8wB.2oLzfm',
          created_at: '2019-02-07 12:08:00',
        },
        {
          id: 10,
          email: 'user10@example.com',
          username: 'user10',
          password:
            '$2b$10$CpiYkz1.Kiz9RNtW7ITioexGF7/lEoS2/bYVewLsjIO8wB.2oLzfm',
          created_at: '2019-02-07 12:09:00',
        },
        {
          id: 11,
          email: 'user11@example.com',
          username: 'user11',
          password:
            '$2b$10$CpiYkz1.Kiz9RNtW7ITioexGF7/lEoS2/bYVewLsjIO8wB.2oLzfm',
          created_at: '2019-02-07 12:10:00',
        },
      ]);
    });
};
