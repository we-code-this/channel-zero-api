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
        }
      ]);
    });
};
