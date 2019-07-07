exports.seed = function(knex, Promise) {
  return knex('videos')
    .del()
    .then(function() {
      return knex('videos').insert([
        { id: 1, user_id: 1, src: 'https://www.youtube.com/embed/YNorGUam5w4' }
      ]);
    });
};
