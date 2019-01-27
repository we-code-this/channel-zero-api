exports.seed = function (knex, Promise) {
  return knex('release_vendors')
    .del()
    .then(function () {
      return knex('release_vendors').insert([
        {
          id: 1,
          release_id: 1,
          vendor_id: 1,
          url: '#',
          created_at: '2019-01-19 12:00:00'
        },
        {
          id: 2,
          release_id: 1,
          vendor_id: 2,
          url: '#',
          created_at: '2019-01-19 12:01:00'
        },
        {
          id: 3,
          release_id: 1,
          vendor_id: 3,
          url: '#',
          created_at: '2019-01-19 12:02:00'
        },
        {
          id: 4,
          release_id: 1,
          vendor_id: 8,
          url: '#',
          created_at: '2019-01-19 12:03:00'
        }
      ])
    })
}
