exports.seed = function (knex, Promise) {
  return knex('ads')
    .del()
    .then(function () {
      return knex('ads').insert([
        {
          id: 1,
          user_id: 1,
          url: 'http://example.com',
          alt: 'Ad 1',
          desktop_filename: 'filename.jpg',
          mobile_filename: 'filename.jpg',
          published: true,
          created_at: '2019-01-19 12:00:00',
        },
        {
          id: 2,
          user_id: 1,
          url: 'http://example.com',
          alt: 'Ad 2',
          desktop_filename: 'filename.jpg',
          mobile_filename: 'filename.jpg',
          published: true,
          created_at: '2019-01-19 12:00:01',
        },
        {
          id: 3,
          user_id: 1,
          url: 'http://example.com',
          alt: 'Ad 3',
          desktop_filename: 'filename.jpg',
          mobile_filename: 'filename.jpg',
          published: true,
          created_at: '2019-01-19 12:00:02',
        },
        {
          id: 4,
          user_id: 1,
          url: 'http://example.com',
          alt: 'Ad 4',
          desktop_filename: 'filename.jpg',
          mobile_filename: 'filename.jpg',
          published: true,
          created_at: '2019-01-19 12:00:03',
        },
        {
          id: 5,
          user_id: 1,
          url: 'http://example.com',
          alt: 'Ad 5',
          desktop_filename: 'filename.jpg',
          mobile_filename: 'filename.jpg',
          published: true,
          created_at: '2019-01-19 12:00:04',
        },
        {
          id: 6,
          user_id: 1,
          url: 'http://example.com',
          alt: 'Ad 6',
          desktop_filename: 'filename.jpg',
          mobile_filename: 'filename.jpg',
          published: true,
          created_at: '2019-01-19 12:00:05',
        },
        {
          id: 7,
          user_id: 1,
          url: 'http://example.com',
          alt: 'Ad 7',
          desktop_filename: 'filename.jpg',
          mobile_filename: 'filename.jpg',
          published: true,
          created_at: '2019-01-19 12:00:06',
        },
        {
          id: 8,
          user_id: 1,
          url: 'http://example.com',
          alt: 'Ad 8',
          desktop_filename: 'filename.jpg',
          mobile_filename: 'filename.jpg',
          published: true,
          created_at: '2019-01-19 12:00:07',
        },
        {
          id: 9,
          user_id: 1,
          url: 'http://example.com',
          alt: 'Ad 9',
          desktop_filename: 'filename.jpg',
          mobile_filename: 'filename.jpg',
          published: true,
          created_at: '2019-01-19 12:00:08',
        },
        {
          id: 10,
          user_id: 1,
          url: 'http://example.com',
          alt: 'Ad 10',
          desktop_filename: 'filename.jpg',
          mobile_filename: 'filename.jpg',
          published: true,
          created_at: '2019-01-19 12:00:09',
        },
        {
          id: 11,
          user_id: 1,
          url: 'http://example.com',
          alt: 'Ad 11',
          desktop_filename: 'filename.jpg',
          mobile_filename: 'filename.jpg',
          published: true,
          created_at: '2019-01-19 12:00:10',
        },
      ]);
    });
};
