exports.seed = function(knex, Promise) {
  return knex("promos")
    .del()
    .then(function() {
      return knex("promos").insert([
        {
          id: 1,
          name: "Mad Urgency",
          url: "#",
          filename: "madurgency.svg",
          location: "horizontal",
          published: true,
          created_at: "2019-01-19 12:00:00"
        },
        {
          id: 2,
          name: "The Age",
          url: "#",
          filename: "the-age.svg",
          location: "horizontal",
          published: true,
          created_at: "2019-01-19 12:01:00"
        },
        {
          id: 3,
          name: "Enemy Books",
          url: "#",
          filename: "enemy-books.svg",
          location: "horizontal",
          published: true,
          created_at: "2019-01-19 12:02:00"
        },
        {
          id: 4,
          name: "Spitburg Pirates",
          url: "#",
          filename: "spitburg-pirates.svg",
          location: "horizontal",
          published: true,
          created_at: "2019-01-19 12:03:00"
        },
        {
          id: 5,
          name: "HipHopGods",
          url: "#",
          filename: "hiphopgods.svg",
          location: "horizontal",
          published: true,
          created_at: "2019-01-19 12:04:00"
        },
        {
          id: 6,
          name: "Rapstation.com",
          url: "#",
          filename: "rapstation.svg",
          location: "vertical",
          published: true,
          created_at: "2019-01-19 12:05:00"
        },
        {
          id: 7,
          name: "Spitslam",
          url: "#",
          filename: "spitslam.svg",
          location: "vertical",
          published: true,
          created_at: "2019-01-19 12:06:00"
        },
        {
          id: 8,
          name: "Spitifly",
          url: "#",
          filename: "spitifly.svg",
          location: "vertical",
          published: true,
          created_at: "2019-01-19 12:06:00"
        },
        {
          id: 9,
          name: "DigTheDig",
          url: "#",
          filename: "dig-the-dig.svg",
          location: "vertical",
          published: true,
          created_at: "2019-01-19 12:07:00"
        }
      ]);
    });
};