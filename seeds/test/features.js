exports.seed = function(knex, Promise) {
  return knex("features")
    .del()
    .then(function() {
      return knex("features").insert([
        {
          id: 1,
          article_id: 1,
          video_id: 1,
          published: true,
          created_at: "2019-01-21 12:00:00"
        },
        {
          id: 2,
          article_id: 1,
          video_id: 1,
          published: true,
          created_at: "2019-01-21 12:01:00"
        },
        {
          id: 3,
          article_id: 1,
          video_id: 1,
          published: true,
          created_at: "2019-01-21 12:02:00"
        },
        {
          id: 4,
          article_id: 1,
          video_id: 1,
          published: true,
          created_at: "2019-01-21 12:03:00"
        },
        {
          id: 5,
          article_id: 1,
          video_id: 1,
          published: true,
          created_at: "2019-01-21 12:04:00"
        },
        {
          id: 6,
          article_id: 1,
          video_id: 1,
          published: true,
          created_at: "2019-01-21 12:05:00"
        },
        {
          id: 7,
          article_id: 1,
          video_id: 1,
          published: true,
          created_at: "2019-01-21 12:06:00"
        },
        {
          id: 8,
          article_id: 1,
          video_id: 1,
          published: true,
          created_at: "2019-01-21 12:07:00"
        },
        {
          id: 9,
          article_id: 1,
          video_id: 1,
          published: true,
          created_at: "2019-01-21 12:08:00"
        },
        {
          id: 10,
          article_id: 1,
          video_id: 1,
          published: true,
          created_at: "2019-01-21 12:09:00"
        },
        {
          id: 11,
          article_id: 1,
          video_id: 1,
          published: true,
          created_at: "2019-01-21 12:10:00"
        }
      ]);
    });
};
