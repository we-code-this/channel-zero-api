exports.seed = function(knex, Promise) {
  return knex("ads")
    .del()
    .then(function() {
      return knex("ads").insert([
        {
          id: 1,
          url: "#",
          alt: "Something awesome to promote",
          desktop_filename: "leaderboard.jpg",
          mobile_filename: "mobile.jpg",
          created_at: "2019-01-19 12:00:00"
        }
      ]);
    });
};
