exports.seed = function(knex, Promise) {
  return knex("release_credits")
    .del()
    .then(function() {
      return knex("release_credits").insert([
        {
          id: 1,
          release_id: 1,
          label: "Credit Label 1",
          value: "Credit Value 1",
          url: null,
          created_at: "2019-02-03 12:00:00"
        },
        {
          id: 2,
          release_id: 1,
          label: "Credit Label 2",
          value: "Credit Value 2",
          url: null,
          created_at: "2019-02-03 12:01:00"
        },
        {
          id: 3,
          release_id: 1,
          label: "Credit Label 3",
          value: "Credit Value 3",
          url: null,
          created_at: "2019-02-03 12:02:00"
        },
        {
          id: 4,
          release_id: 1,
          label: "Credit Label 4",
          value: "Credit Value 4",
          url: null,
          created_at: "2019-02-03 12:03:00"
        },
        {
          id: 5,
          release_id: 1,
          label: "Credit Label 5",
          value: "Credit Value 5",
          url: null,
          created_at: "2019-02-03 12:04:00"
        },
        {
          id: 6,
          release_id: 1,
          label: "Credit Label 6",
          value: "Credit Value 6",
          url: null,
          created_at: "2019-02-03 12:05:00"
        },
        {
          id: 7,
          release_id: 1,
          label: "Credit Label 7",
          value: "Credit Value 7",
          url: null,
          created_at: "2019-02-03 12:06:00"
        },
        {
          id: 8,
          release_id: 1,
          label: "Credit Label 8",
          value: "Credit Value 8",
          url: null,
          created_at: "2019-02-03 12:07:00"
        },
        {
          id: 9,
          release_id: 1,
          label: "Credit Label 9",
          value: "Credit Value 9",
          url: null,
          created_at: "2019-02-03 12:08:00"
        },
        {
          id: 10,
          release_id: 1,
          label: "Credit Label 10",
          value: "Credit Value 10",
          url: null,
          created_at: "2019-02-03 12:09:00"
        },
        {
          id: 11,
          release_id: 2,
          label: "Credit Label 11",
          value: "Credit Value 11",
          url: null,
          created_at: "2019-02-03 12:10:00"
        }
      ]);
    });
};
