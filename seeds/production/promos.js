exports.seed = function(knex, Promise) {
  return knex('promos')
    .select()
    .where({
      name: 'DigTheDig',
    })
    .then(function(rows) {
      if (rows.length === 0) {
        return knex('promos').insert([
          {
            id: 1,
            user_id: 1,
            name: 'Mad Urgency',
            url: '#',
            filename: 'madurgency.svg',
            location: 'horizontal',
            published: true,
            created_at: '2019-01-19 12:00:00',
          },
          {
            id: 2,
            user_id: 1,
            name: 'The Age',
            url: '#',
            filename: 'the-age.svg',
            location: 'horizontal',
            published: true,
            created_at: '2019-01-19 12:01:00',
          },
          {
            id: 3,
            user_id: 1,
            name: 'Enemy Books',
            url: '#',
            filename: 'enemy-books.svg',
            location: 'horizontal',
            published: true,
            created_at: '2019-01-19 12:02:00',
          },
          {
            id: 4,
            user_id: 1,
            name: 'Spitburg Pirates',
            url: '#',
            filename: 'spitburg-pirates.svg',
            location: 'horizontal',
            published: true,
            created_at: '2019-01-19 12:03:00',
          },
          {
            id: 5,
            user_id: 1,
            name: 'HipHopGods',
            url: '#',
            filename: 'hiphopgods.svg',
            location: 'horizontal',
            published: true,
            created_at: '2019-01-19 12:04:00',
          },
          {
            id: 6,
            user_id: 1,
            name: 'Spitifly',
            url: '#',
            filename: 'spitifly.svg',
            location: 'vertical',
            published: true,
            created_at: '2019-01-19 12:06:00',
          },
          {
            id: 7,
            user_id: 1,
            name: 'Rapstation.com',
            url: 'https://rapstation.com',
            filename: 'rapstation.svg',
            location: 'vertical',
            published: true,
            created_at: '2019-01-19 12:05:00',
          },
          {
            id: 8,
            user_id: 1,
            name: 'Spitslam',
            url: 'https://slamjamz.com',
            filename: 'spitslam.svg',
            location: 'vertical',
            published: true,
            created_at: '2019-01-19 12:06:00',
          },
          {
            id: 9,
            user_id: 1,
            name: 'DigTheDig',
            url: '/dig',
            filename: 'dig-the-dig.svg',
            location: 'vertical',
            published: true,
            created_at: '2019-01-19 12:07:00',
          },
        ]);
      }
    });
};
