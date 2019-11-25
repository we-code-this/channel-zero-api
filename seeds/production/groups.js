exports.seed = function(knex, Promise) {
  return knex('groups')
    .select()
    .where({
      id: 1,
      name: 'Admin',
      slug: 'admin'
    })
    .then(function(rows) {
      if (rows.length === 0) {
        return knex('groups').insert([
          {
            id: 1,
            name: 'Admin',
            slug: 'admin'
          },
          {
            id: 2,
            name: 'Editor',
            slug: 'editor'
          },
          {
            id: 3,
            name: 'Author',
            slug: 'author'
          }
        ]);
      }
    });
};
