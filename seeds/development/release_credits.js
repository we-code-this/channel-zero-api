exports.seed = function (knex, Promise) {
  return knex('release_credits')
    .del()
    .then(function () {
      return knex('release_credits').insert([
        {
          id: 1,
          release_id: 1,
          label: 'Executive Producer',
          value: 'Chuck D',
          url: null,
          created_at: '2019-02-03 12:00:00'
        },
        {
          id: 2,
          release_id: 1,
          label: 'Album Producer',
          value: 'C-Doc',
          url: null,
          created_at: '2019-02-03 12:01:00'
        },
        {
          id: 3,
          release_id: 1,
          label: 'Associate Producer',
          value: 'JP Hesser of Castaway 7',
          url: null,
          created_at: '2019-02-03 12:02:00'
        },
        {
          id: 4,
          release_id: 1,
          label: 'Mastered by',
          value:
            'Shawn Franklin at “S.T.O.H.” Labs for TDX (The Definitive Xperience)',
          url: 'https://defexperience.com/',
          created_at: '2019-02-03 12:03:00'
        },
        {
          id: 5,
          release_id: 1,
          label: 'Cover Photo by',
          value: 'Carl Ryder',
          url: null,
          created_at: '2019-02-03 12:04:00'
        },
        {
          id: 6,
          release_id: 1,
          label: 'Additional Photos by',
          value: 'Eitan Miskevich',
          url: null,
          created_at: '2019-02-03 12:05:00'
        },
        {
          id: 7,
          release_id: 1,
          label: 'Cover Design by',
          value: 'Kelvin Fonville',
          url: null,
          created_at: '2019-02-03 12:06:00'
        },
        {
          id: 8,
          release_id: 1,
          label: 'Additional Design and Layout by',
          value: 'DC Snyder',
          url: null,
          created_at: '2019-02-03 12:07:00'
        }
      ])
    })
}
