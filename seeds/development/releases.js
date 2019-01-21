exports.seed = function(knex, Promise) {
  return knex("releases")
    .del()
    .then(function() {
      return knex("releases").insert([
        {
          id: 1,
          artist_id: 1,
          title: "Celebration of Ignorance",
          slug: "chuck-d-mistachuck-celebration-ignorance",
          filename: "mistachuck.png",
          published: true,
          created_at: "2019-01-19 12:00:00"
        },
        {
          id: 2,
          artist_id: 2,
          title: "Afterburn",
          slug: "dj-lord-afterburn",
          filename: "dj-lord.jpg",
          published: true,
          created_at: "2019-01-19 12:01:00"
        },
        {
          id: 3,
          artist_id: 3,
          title: "North Country",
          slug: "anime-oscen-hive-north-country",
          filename: "anime-oscen.jpg",
          published: true,
          created_at: "2019-01-19 12:02:00"
        }
      ]);
    });
};
