exports.seed = function(knex, Promise) {
  return knex('labels')
    .del()
    .then(function() {
      return knex('labels').insert([
        {
          id: 1,
          user_id: 1,
          name: 'SpitSlam',
          slug: 'spitslam',
          created_at: '2019-02-07 12:00:00',
          updated_at: null
        },
        {
          id: 2,
          user_id: 1,
          name: 'Odad Truth Records',
          slug: 'odad-truth-records',
          created_at: '2019-02-07 12:01:00',
          updated_at: null
        },
        {
          id: 3,
          user_id: 1,
          name: 'SLAM Worldwide Music',
          slug: 'slam-worldwide-music',
          created_at: '2019-02-07 12:02:00',
          updated_at: null
        },
        {
          id: 4,
          user_id: 1,
          name: 'INST',
          slug: 'inst',
          created_at: '2019-02-07 12:03:00',
          updated_at: null
        },
        {
          id: 5,
          user_id: 1,
          name: 'Connected SpitSlam Associated Labels',
          slug: 'connected-spitslam-associated-labels',
          created_at: '2019-02-07 12:04:00',
          updated_at: null
        },
        {
          id: 6,
          user_id: 1,
          name: 'SPITdigital Recordings',
          slug: 'spitdigital-recordings',
          created_at: '2019-02-07 12:05:00',
          updated_at: null
        },
        {
          id: 7,
          user_id: 1,
          name: 'blocSonic',
          slug: 'blocsonic',
          created_at: '2019-02-07 12:06:00',
          updated_at: null
        },
        {
          id: 8,
          user_id: 1,
          name: 'GODspell',
          slug: 'godspell',
          created_at: '2019-02-07 12:07:00',
          updated_at: null
        }
      ]);
    });
};
