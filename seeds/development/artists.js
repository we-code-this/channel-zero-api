exports.seed = function(knex, Promise) {
  return knex("artists")
    .del()
    .then(function() {
      return knex("artists").insert([
        {
          id: 1,
          name: "Chuck D aka Mistachuck",
          slug: "chuck-d-aka-mistachuck",
          created_at: "2019-01-20 12:00:00"
        },
        {
          id: 2,
          name: "DJ Lord",
          slug: "dj-lord",
          created_at: "2019-01-20 12:01:00"
        },
        {
          id: 3,
          name: "Anime Oscen & Hive",
          slug: "anime-oscen-hive",
          created_at: "2019-01-20 12:02:00"
        }
      ]);
    });
};
