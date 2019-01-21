exports.seed = function(knex, Promise) {
  return knex("releases")
    .del()
    .then(function() {
      return knex("releases").insert([
        {
          id: 1,
          artist_id: 1,
          title: "Album 1",
          slug: "artist-1-album-1",
          filename: "example.png",
          published: true,
          created_at: "2019-01-19 12:00:00"
        },
        {
          id: 2,
          artist_id: 2,
          title: "Album 2",
          slug: "artist-2-album-2",
          filename: "example.png",
          published: true,
          created_at: "2019-01-19 12:01:00"
        },
        {
          id: 3,
          artist_id: 3,
          title: "Album 3",
          slug: "artist-3-album-3",
          filename: "example.png",
          published: true,
          created_at: "2019-01-19 12:02:00"
        },
        {
          id: 4,
          artist_id: 4,
          title: "Album 4",
          slug: "artist-4-album-4",
          filename: "example.png",
          published: true,
          created_at: "2019-01-19 12:03:00"
        },
        {
          id: 5,
          artist_id: 5,
          title: "Album 5",
          slug: "artist-5-album-5",
          filename: "example.png",
          published: true,
          created_at: "2019-01-19 12:04:00"
        },
        {
          id: 6,
          artist_id: 6,
          title: "Album 6",
          slug: "artist-6-album-6",
          filename: "example.png",
          published: true,
          created_at: "2019-01-19 12:05:00"
        },
        {
          id: 7,
          artist_id: 7,
          title: "Album 7",
          slug: "artist-7-album-7",
          filename: "example.png",
          published: true,
          created_at: "2019-01-19 12:06:00"
        },
        {
          id: 8,
          artist_id: 8,
          title: "Album 8",
          slug: "artist-8-album-8",
          filename: "example.png",
          published: true,
          created_at: "2019-01-19 12:07:00"
        },
        {
          id: 9,
          artist_id: 9,
          title: "Album 9",
          slug: "artist-9-album-9",
          filename: "example.png",
          published: true,
          created_at: "2019-01-19 12:08:00"
        },
        {
          id: 10,
          artist_id: 10,
          title: "Album 10",
          slug: "artist-10-album-10",
          filename: "example.png",
          published: true,
          created_at: "2019-01-19 12:09:00"
        },
        {
          id: 11,
          artist_id: 11,
          title: "Album 11",
          slug: "artist-11-album-11",
          filename: "example.png",
          published: true,
          created_at: "2019-01-19 12:10:00"
        }
      ]);
    });
};