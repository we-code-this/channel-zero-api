exports.seed = function(knex, Promise) {
  return knex("labels")
    .del()
    .then(function() {
      return knex("labels").insert([
        {
          id: 1,
          name: "Label 1",
          slug: "label-1",
          created_at: "2019-02-07 12:00:00",
          updated_at: "2019-02-07 12:00:00"
        },
        {
          id: 2,
          name: "Label 2",
          slug: "label-2",
          created_at: "2019-03-23 12:00:02",
          updated_at: "2019-03-23 12:00:02"
        },
        {
          id: 3,
          name: "Label 3",
          slug: "label-3",
          created_at: "2019-03-23 12:00:03",
          updated_at: "2019-03-23 12:00:03"
        },
        {
          id: 4,
          name: "Label 4",
          slug: "label-4",
          created_at: "2019-03-23 12:00:04",
          updated_at: "2019-03-23 12:00:04"
        },
        {
          id: 5,
          name: "Label 5",
          slug: "label-5",
          created_at: "2019-03-23 12:00:05",
          updated_at: "2019-03-23 12:00:05"
        },
        {
          id: 6,
          name: "Label 6",
          slug: "label-6",
          created_at: "2019-03-23 12:00:06",
          updated_at: "2019-03-23 12:00:06"
        },
        {
          id: 7,
          name: "Label 7",
          slug: "label-7",
          created_at: "2019-03-23 12:00:07",
          updated_at: "2019-03-23 12:00:07"
        },
        {
          id: 8,
          name: "Label 8",
          slug: "label-8",
          created_at: "2019-03-23 12:00:08",
          updated_at: "2019-03-23 12:00:08"
        },
        {
          id: 9,
          name: "Label 9",
          slug: "label-9",
          created_at: "2019-03-23 12:00:09",
          updated_at: "2019-03-23 12:00:09"
        },
        {
          id: 10,
          name: "Label 10",
          slug: "label-10",
          created_at: "2019-03-23 12:00:10",
          updated_at: "2019-03-23 12:00:10"
        },
        {
          id: 11,
          name: "Label 11",
          slug: "label-11",
          created_at: "2019-03-23 12:00:11",
          updated_at: "2019-03-23 12:00:11"
        }
      ]);
    });
};
