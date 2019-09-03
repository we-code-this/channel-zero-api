exports.seed = function(knex, Promise) {
  return knex('endorsements')
    .del()
    .then(function() {
      return knex('endorsements').insert([
        {
          id: 1,
          user_id: 1,
          related_id: 1,
          review: 'Review 1',
          reviewer: 'Reviewer 1',
          url: null,
          type: 'release',
          created_at: '2019-02-03 12:01:00'
        },
        {
          id: 2,
          user_id: 1,
          related_id: 1,
          review: 'Review 2',
          reviewer: 'Reviewer 2',
          url: null,
          type: 'release',
          created_at: '2019-02-03 12:02:00'
        },
        {
          id: 3,
          user_id: 1,
          related_id: 2,
          review: 'Review 3',
          reviewer: 'Reviewer 3',
          url: null,
          type: 'release',
          created_at: '2019-02-03 12:03:00'
        },
        {
          id: 4,
          user_id: 1,
          related_id: 3,
          review: 'Review 4',
          reviewer: 'Reviewer 4',
          url: null,
          type: 'release',
          created_at: '2019-02-03 12:04:00'
        },
        {
          id: 5,
          user_id: 1,
          related_id: 4,
          review: 'Review 5',
          reviewer: 'Reviewer 5',
          url: null,
          type: 'release',
          created_at: '2019-02-03 12:05:00'
        },
        {
          id: 6,
          user_id: 1,
          related_id: 5,
          review: 'Review 6',
          reviewer: 'Reviewer 6',
          url: null,
          type: 'release',
          created_at: '2019-02-03 12:06:00'
        },
        {
          id: 7,
          user_id: 1,
          related_id: 6,
          review: 'Review 7',
          reviewer: 'Reviewer 7',
          url: null,
          type: 'release',
          created_at: '2019-02-03 12:07:00'
        },
        {
          id: 8,
          user_id: 1,
          related_id: 7,
          review: 'Review 8',
          reviewer: 'Reviewer 8',
          url: null,
          type: 'release',
          created_at: '2019-02-03 12:08:00'
        },
        {
          id: 9,
          user_id: 1,
          related_id: 8,
          review: 'Review 9',
          reviewer: 'Reviewer 9',
          url: null,
          type: 'release',
          created_at: '2019-02-03 12:09:00'
        },
        {
          id: 10,
          user_id: 1,
          related_id: 9,
          review: 'Review 10',
          reviewer: 'Reviewer 10',
          url: null,
          type: 'release',
          created_at: '2019-02-03 12:10:00'
        },
        {
          id: 11,
          user_id: 1,
          related_id: 10,
          review: 'Review 11',
          reviewer: 'Reviewer 11',
          url: null,
          type: 'release',
          created_at: '2019-02-03 12:11:00'
        }
      ]);
    });
};
