exports.seed = function(knex, Promise) {
  return knex('promos')
    .del()
    .then(function() {
      return knex('promos').insert([
        {
          id: 1,
          user_id: 1,
          name: 'Promo 1',
          url: '#',
          filename: 'promo-1.svg',
          location: 'horizontal',
          published: true,
          created_at: '2019-01-19 12:00:00'
        },
        {
          id: 2,
          user_id: 1,
          name: 'Promo 2',
          url: '#',
          filename: 'promo-2.svg',
          location: 'horizontal',
          published: true,
          created_at: '2019-01-19 12:01:00'
        },
        {
          id: 3,
          user_id: 1,
          name: 'Promo 3',
          url: '#',
          filename: 'promo-3.svg',
          location: 'horizontal',
          published: true,
          created_at: '2019-01-19 12:02:00'
        },
        {
          id: 4,
          user_id: 1,
          name: 'Promo 4',
          url: '#',
          filename: 'promo-4.svg',
          location: 'horizontal',
          published: true,
          created_at: '2019-01-19 12:03:00'
        },
        {
          id: 5,
          user_id: 1,
          name: 'Promo 5',
          url: '#',
          filename: 'promo-5.svg',
          location: 'horizontal',
          published: true,
          created_at: '2019-01-19 12:04:00'
        },
        {
          id: 6,
          user_id: 1,
          name: 'Promo 6',
          url: '#',
          filename: 'promo-6.svg',
          location: 'vertical',
          published: true,
          created_at: '2019-01-19 12:05:00'
        },
        {
          id: 7,
          user_id: 1,
          name: 'Promo 7',
          url: '#',
          filename: 'promo-7.svg',
          location: 'vertical',
          published: true,
          created_at: '2019-01-19 12:06:00'
        },
        {
          id: 8,
          user_id: 1,
          name: 'Promo 8',
          url: '#',
          filename: 'promo-8.svg',
          location: 'vertical',
          published: true,
          created_at: '2019-01-19 12:07:00'
        },
        {
          id: 9,
          user_id: 1,
          name: 'Promo 9',
          url: '#',
          filename: 'promo-9.svg',
          location: 'vertical',
          published: true,
          created_at: '2019-01-19 12:08:00'
        }
      ]);
    });
};
