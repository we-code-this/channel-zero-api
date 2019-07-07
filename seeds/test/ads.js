exports.seed = function(knex, Promise) {
  return knex('ads')
    .del()
    .then(function() {
      return knex('ads').insert([
        {
          id: 1,
          user_id: 1,
          url: '#',
          alt: 'Ad 1',
          desktop_filename: 'filename.jpg',
          mobile_filename: 'filename.jpg',
          published: true,
          created_at: '2019-01-19 12:00:00'
        }
      ]);
    });
};
