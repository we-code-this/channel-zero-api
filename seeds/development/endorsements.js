exports.seed = function(knex, Promise) {
  return knex('endorsements')
    .del()
    .then(function() {
      return knex('endorsements').insert([
        {
          id: 1,
          user_id: 1,
          related_id: 1,
          review: 'Incredible album… not to be missed!',
          reviewer: 'Someone',
          url: null,
          type: 'release',
          created_at: '2019-02-03 12:01:00'
        },
        {
          id: 2,
          user_id: 1,
          related_id: 1,
          review: 'Among my favorite albums of the year!',
          reviewer: 'Another Person',
          url: '#',
          type: 'release',
          created_at: '2019-02-03 12:02:00'
        }
      ]);
    });
};
