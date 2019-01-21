exports.seed = function(knex, Promise) {
  return knex("features")
    .del()
    .then(function() {
      return knex("features").insert([
        {
          id: 1,
          article_id: 11,
          video_id: 1,
          published: true,
          created_at: "2019-01-21 12:00:00"
        }
      ]);
    });
};
