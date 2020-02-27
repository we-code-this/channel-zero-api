exports.seed = function(knex, Promise) {
  return knex('release_tracks')
    .del()
    .then(function() {
      return knex('release_tracks').insert([
        {
          id: 1,
          number: 1,
          title: 'Track 1',
          slug: 'track-1',
          disc_id: 1,
          created_at: '2019-01-19 12:00:01',
        },
        {
          id: 2,
          number: 2,
          title: 'Track 2',
          slug: 'track-2',
          disc_id: 1,
          created_at: '2019-01-19 12:00:02',
        },
        {
          id: 3,
          number: 3,
          title: 'Track 3',
          slug: 'track-3',
          disc_id: 1,
          created_at: '2019-01-19 12:00:03',
        },
        {
          id: 4,
          number: 4,
          title: 'Track 4',
          slug: 'track-4',
          disc_id: 1,
          created_at: '2019-01-19 12:00:04',
        },
        {
          id: 5,
          number: 5,
          title: 'Track 5',
          slug: 'track-5',
          disc_id: 1,
          created_at: '2019-01-19 12:00:05',
        },
        {
          id: 6,
          number: 6,
          title: 'Track 6',
          slug: 'track-6',
          disc_id: 1,
          created_at: '2019-01-19 12:00:06',
        },
        {
          id: 7,
          number: 7,
          title: 'Track 7',
          slug: 'track-7',
          disc_id: 1,
          created_at: '2019-01-19 12:00:07',
        },
        {
          id: 8,
          number: 8,
          title: 'Track 8',
          slug: 'track-8',
          disc_id: 1,
          created_at: '2019-01-19 12:00:08',
        },
        {
          id: 9,
          number: 9,
          title: 'Track 9',
          slug: 'track-9',
          disc_id: 1,
          created_at: '2019-01-19 12:00:09',
        },
        {
          id: 10,
          number: 1,
          title: 'Track 1',
          slug: 'track-1',
          disc_id: 2,
          created_at: '2019-01-19 12:00:10',
        },
        {
          id: 11,
          number: 2,
          title: 'Track 2',
          slug: 'track-2',
          disc_id: 2,
          created_at: '2019-01-19 12:00:11',
        },
      ]);
    });
};
