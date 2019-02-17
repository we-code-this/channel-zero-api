exports.seed = function(knex, Promise) {
  return knex("artists")
    .del()
    .then(function() {
      return knex("artists").insert([
        {
          id: 1,
          name: "Artist 1",
          slug: "artist-1",
          description: "artist description",
          created_at: "2019-01-20 12:00:00"
        },
        {
          id: 2,
          name: "Artist 2",
          slug: "artist-2",
          description: "artist description",
          created_at: "2019-01-20 12:01:00"
        },
        {
          id: 3,
          name: "Artist 3",
          slug: "artist-3",
          description: "artist description",
          created_at: "2019-01-20 12:02:00"
        },
        {
          id: 4,
          name: "Artist 4",
          slug: "artist-4",
          description: "artist description",
          created_at: "2019-01-20 12:03:00"
        },
        {
          id: 5,
          name: "Artist 5",
          slug: "artist-5",
          description: "artist description",
          created_at: "2019-01-20 12:04:00"
        },
        {
          id: 6,
          name: "Artist 6",
          slug: "artist-6",
          description: "artist description",
          created_at: "2019-01-20 12:05:00"
        },
        {
          id: 7,
          name: "Artist 7",
          slug: "artist-7",
          description: "artist description",
          created_at: "2019-01-20 12:06:00"
        },
        {
          id: 8,
          name: "Artist 8",
          slug: "artist-8",
          description: "artist description",
          created_at: "2019-01-20 12:07:00"
        },
        {
          id: 9,
          name: "Artist 9",
          slug: "artist-9",
          description: "artist description",
          created_at: "2019-01-20 12:08:00"
        },
        {
          id: 10,
          name: "Artist 10",
          slug: "artist-10",
          description: "artist description",
          created_at: "2019-01-20 12:09:00"
        },
        {
          id: 11,
          name: "Artist 11",
          slug: "artist-11",
          description: "artist description",
          created_at: "2019-01-20 12:10:00"
        }
      ]);
    });
};
