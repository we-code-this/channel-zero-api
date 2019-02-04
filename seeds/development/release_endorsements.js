exports.seed = function(knex, Promise) {
  return knex("release_endorsements")
    .del()
    .then(function() {
      return knex("release_endorsements").insert([
        {
          id: 1,
          release_id: 1,
          endorsement_id: 1,
          created_at: "2019-02-03 12:01:00"
        },
        {
          id: 2,
          release_id: 1,
          endorsement_id: 2,
          created_at: "2019-02-03 12:02:00"
        }
      ]);
    });
};
