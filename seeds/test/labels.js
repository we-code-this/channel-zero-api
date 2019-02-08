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
        }
      ]);
    });
};
