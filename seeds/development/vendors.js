exports.seed = function(knex, Promise) {
  return knex('vendors')
    .del()
    .then(function() {
      return knex('vendors').insert([
        { id: 1, user_id: 1, name: 'Apple Music', icon_class: 'apple' },
        { id: 2, user_id: 1, name: 'Amazon Music', icon_class: 'amazon' },
        { id: 3, user_id: 1, name: 'Google Play', icon_class: 'google-play' },
        { id: 4, user_id: 1, name: 'Bandcamp', icon_class: 'bandcamp' },
        { id: 5, user_id: 1, name: 'Deezer', icon_class: 'deezer' },
        { id: 6, user_id: 1, name: 'Tidal', icon_class: 'tidal' },
        { id: 7, user_id: 1, name: 'HDtracks', icon_class: 'hdtracks' },
        { id: 8, user_id: 1, name: 'Spotify', icon_class: 'spotify' }
      ]);
    });
};
