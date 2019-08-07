exports.seed = function(knex, Promise) {
  return knex('articles')
    .del()
    .then(function() {
      return knex('articles').insert([
        {
          id: 1,
          user_id: 1,
          title: 'Article 1',
          slug: 'article-1',
          summary: 'Article 1 summary',
          description: 'Article 1 description',
          filename: 'example.png',
          published: true,
          created_at: '2019-01-19 12:00:00'
        },
        {
          id: 2,
          user_id: 1,
          title: 'Article 2',
          slug: 'article-2',
          summary: 'Article 2 summary',
          description: 'Article 2 description',
          filename: 'example.png',
          published: true,
          created_at: '2019-01-19 12:01:00'
        },
        {
          id: 3,
          user_id: 1,
          title: 'Article 3',
          slug: 'article-3',
          summary: 'Article 3 summary',
          description: 'Article 3 description',
          filename: 'example.png',
          published: true,
          created_at: '2019-01-19 12:02:00'
        },
        {
          id: 4,
          user_id: 1,
          title: 'Article 4',
          slug: 'article-4',
          summary: 'Article 4 summary',
          description: 'Article 4 description',
          filename: 'example.png',
          published: true,
          created_at: '2019-01-19 12:03:00'
        },
        {
          id: 5,
          user_id: 1,
          title: 'Article 5',
          slug: 'article-5',
          summary: 'Article 5 summary',
          description: 'Article 5 description',
          filename: 'example.png',
          published: true,
          created_at: '2019-01-19 12:04:00'
        },
        {
          id: 6,
          user_id: 1,
          title: 'Article 6',
          slug: 'article-6',
          summary: 'Article 6 summary',
          description: 'Article 6 description',
          filename: 'example.png',
          published: true,
          created_at: '2019-01-19 12:05:00'
        },
        {
          id: 7,
          user_id: 1,
          title: 'Article 7',
          slug: 'article-7',
          summary: 'Article 7 summary',
          description: 'Article 7 description',
          filename: 'example.png',
          published: true,
          created_at: '2019-01-19 12:06:00'
        },
        {
          id: 8,
          user_id: 1,
          title: 'Article 8',
          slug: 'article-8',
          summary: 'Article 8 summary',
          description: 'Article 8 description',
          filename: 'example.png',
          published: true,
          created_at: '2019-01-19 12:07:00'
        },
        {
          id: 9,
          user_id: 1,
          title: 'Article 9',
          slug: 'article-9',
          summary: 'Article 9 summary',
          description: 'Article 9 description',
          filename: 'example.png',
          published: true,
          created_at: '2019-01-19 12:08:00'
        },
        {
          id: 10,
          user_id: 1,
          title: 'Article 10',
          slug: 'article-10',
          summary: 'Article 10 summary',
          description: 'Article 10 description',
          filename: 'example.png',
          published: true,
          created_at: '2019-01-19 12:09:00'
        },
        {
          id: 11,
          user_id: 1,
          title: 'Article 11',
          slug: 'article-11',
          summary: 'Article 11 summary',
          description: 'Article 11 description',
          published: true,
          created_at: '2019-01-19 12:10:00'
        }
      ]);
    });
};
