exports.seed = function(knex, Promise) {
  return knex("vendors")
    .del()
    .then(function() {
      return knex("vendors").insert([
        { id: 1, name: "Apple Music", icon_class: "apple-music" },
        { id: 2, name: "Amazon Music", icon_class: "amazon-music" },
        { id: 3, name: "Google Play", icon_class: "google play" },
        { id: 4, name: "Bandcamp", icon_class: "bandcamp" },
        { id: 5, name: "Deezer", icon_class: "deezer" },
        { id: 6, name: "Tidal", icon_class: "tidal" },
        { id: 7, name: "HDtracks", icon_class: "hdtracks" }
      ]);
    });
};
