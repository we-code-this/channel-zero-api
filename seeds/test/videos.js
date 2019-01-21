exports.seed = function(knex, Promise) {
  return knex("videos")
    .del()
    .then(function() {
      return knex("videos").insert([{ id: 1, src: "http://example.com" }]);
    });
};
