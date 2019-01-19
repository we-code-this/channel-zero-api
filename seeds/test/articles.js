exports.seed = function(knex, Promise) {
  return knex("articles")
    .del()
    .then(function() {
      return knex("articles").insert([
        {
          id: 1,
          url: "#",
          title: "Article 1",
          summary: "Article 1 summary",
          created_at: "2019-01-19 12:00:00"
        },
        {
          id: 2,
          url: "#",
          title: "Article 2",
          summary: "Article 2 summary",
          created_at: "2019-01-19 12:01:00"
        },
        {
          id: 3,
          url: "#",
          title: "Article 3",
          summary: "Article 3 summary",
          created_at: "2019-01-19 12:02:00"
        },
        {
          id: 4,
          url: "#",
          title: "Article 4",
          summary: "Article 4 summary",
          created_at: "2019-01-19 12:03:00"
        },
        {
          id: 5,
          url: "#",
          title: "Article 5",
          summary: "Article 5 summary",
          created_at: "2019-01-19 12:04:00"
        },
        {
          id: 6,
          url: "#",
          title: "Article 6",
          summary: "Article 6 summary",
          created_at: "2019-01-19 12:05:00"
        },
        {
          id: 7,
          url: "#",
          title: "Article 7",
          summary: "Article 7 summary",
          created_at: "2019-01-19 12:06:00"
        },
        {
          id: 8,
          url: "#",
          title: "Article 8",
          summary: "Article 8 summary",
          created_at: "2019-01-19 12:07:00"
        },
        {
          id: 9,
          url: "#",
          title: "Article 9",
          summary: "Article 9 summary",
          created_at: "2019-01-19 12:08:00"
        },
        {
          id: 10,
          url: "#",
          title: "Article 10",
          summary: "Article 10 summary",
          created_at: "2019-01-19 12:09:00"
        },
        {
          id: 11,
          url: "#",
          title: "Article 11",
          summary: "Article 11 summary",
          created_at: "2019-01-19 12:10:00"
        }
      ]);
    });
};
