exports.seed = function(knex, Promise) {
  return knex("promos")
    .del()
    .then(function() {
      return knex("promos").insert([
        {
          id: 1,
          name: "Promo 1",
          url: "#",
          filename: "promo-1.svg",
          location: "horizontal",
          published: true,
          created_at: "2019-01-19 12:00:00"
        },
        {
          id: 2,
          name: "Promo 2",
          url: "#",
          filename: "promo-2.svg",
          location: "vertical",
          published: true,
          created_at: "2019-01-19 12:01:00"
        },
        {
          id: 3,
          name: "Promo 3",
          url: "#",
          filename: "promo-3.svg",
          location: "vertical",
          published: true,
          created_at: "2019-01-19 12:02:00"
        }
      ]);
    });
};
