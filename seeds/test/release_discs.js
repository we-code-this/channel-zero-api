exports.seed = function(knex, Promise) {
  return knex('release_discs')
    .del()
    .then(function() {
      return knex('release_discs').insert([
        {
          id: 1,
          sort: 0,
          name: 'Disc 1',
          release_id: 1,
          created_at: '2019-01-19 12:00:01',
        },
        {
          id: 2,
          sort: 0,
          name: 'Disc 1',
          release_id: 2,
          created_at: '2019-01-19 12:00:02',
        },
        {
          id: 3,
          sort: 0,
          name: 'Disc 1',
          release_id: 3,
          created_at: '2019-01-19 12:00:03',
        },
        {
          id: 4,
          sort: 0,
          name: 'Disc 1',
          release_id: 4,
          created_at: '2019-01-19 12:00:04',
        },
        {
          id: 5,
          sort: 0,
          name: 'Disc 1',
          release_id: 5,
          created_at: '2019-01-19 12:00:05',
        },
        {
          id: 6,
          sort: 0,
          name: 'Disc 1',
          release_id: 6,
          created_at: '2019-01-19 12:00:06',
        },
        {
          id: 7,
          sort: 0,
          name: 'Disc 1',
          release_id: 7,
          created_at: '2019-01-19 12:00:07',
        },
        {
          id: 8,
          sort: 0,
          name: 'Disc 1',
          release_id: 8,
          created_at: '2019-01-19 12:00:08',
        },
        {
          id: 9,
          sort: 0,
          name: 'Disc 1',
          release_id: 9,
          created_at: '2019-01-19 12:00:09',
        },
        {
          id: 10,
          sort: 0,
          name: 'Disc 1',
          release_id: 10,
          created_at: '2019-01-19 12:00:10',
        },
        {
          id: 11,
          sort: 0,
          name: 'Disc 1',
          release_id: 11,
          created_at: '2019-01-19 12:00:11',
        },
        {
          id: 12,
          sort: 1,
          name: 'Disc 2',
          release_id: 1,
          created_at: '2019-01-19 12:00:12',
        },
        {
          id: 13,
          sort: 2,
          name: 'Disc 3',
          release_id: 1,
          created_at: '2019-01-19 12:00:13',
        },
      ]);
    });
};
