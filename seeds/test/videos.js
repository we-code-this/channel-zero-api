exports.seed = function(knex, Promise) {
  return knex('videos')
    .del()
    .then(function() {
      return knex('videos').insert([
        {
          id: 1,
          user_id: 1,
          src: 'http://video-1.com',
          created_at: '2019-01-19 12:00:00'
        },
        {
          id: 2,
          user_id: 1,
          src: 'http://video-2.com',
          created_at: '2019-01-19 12:00:01'
        },
        {
          id: 3,
          user_id: 1,
          src: 'http://video-3.com',
          created_at: '2019-01-19 12:00:02'
        },
        {
          id: 4,
          user_id: 1,
          src: 'http://video-4.com',
          created_at: '2019-01-19 12:00:03'
        },
        {
          id: 5,
          user_id: 1,
          src: 'http://video-5.com',
          created_at: '2019-01-19 12:00:04'
        },
        {
          id: 6,
          user_id: 1,
          src: 'http://video-6.com',
          created_at: '2019-01-19 12:00:05'
        },
        {
          id: 7,
          user_id: 1,
          src: 'http://video-7.com',
          created_at: '2019-01-19 12:00:06'
        },
        {
          id: 8,
          user_id: 1,
          src: 'http://video-8.com',
          created_at: '2019-01-19 12:00:07'
        },
        {
          id: 9,
          user_id: 1,
          src: 'http://video-9.com',
          created_at: '2019-01-19 12:00:08'
        },
        {
          id: 10,
          user_id: 1,
          src: 'http://video-10.com',
          created_at: '2019-01-19 12:00:09'
        },
        {
          id: 11,
          user_id: 1,
          src: 'http://video-11.com',
          created_at: '2019-01-19 12:00:10'
        }
      ]);
    });
};
