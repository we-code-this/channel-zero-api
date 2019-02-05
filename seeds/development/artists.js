exports.seed = function(knex, Promise) {
  return knex("artists")
    .del()
    .then(function() {
      return knex("artists").insert([
        {
          id: 1,
          name: "Chuck D aka Mistachuck",
          slug: "chuck-d-aka-mistachuck",
          created_at: "2019-01-20 12:00:00"
        },
        {
          id: 2,
          name: "DJ Lord",
          slug: "dj-lord",
          created_at: "2019-01-20 12:01:00"
        },
        {
          id: 3,
          name: "Anime Oscen & Hive",
          slug: "anime-oscen-hive",
          created_at: "2019-01-20 12:02:00"
        },
        {
          id: 4,
          name: "Professor Daddy O",
          slug: "professor-daddy-o",
          created_at: "2019-01-20 12:03:00"
        },
        {
          id: 5,
          name: "Memphis Jelks",
          slug: "memphis-jelks",
          created_at: "2019-01-20 12:04:00"
        },
        {
          id: 6,
          name: "Rukus Music",
          slug: "rukus-music",
          created_at: "2019-01-20 12:05:00"
        },
        {
          id: 7,
          name: "Jahi as PE2.0",
          slug: "jahi-pe20",
          created_at: "2019-01-20 12:06:00"
        },
        {
          id: 8,
          name: "East Duel West",
          slug: "east-duel-west",
          created_at: "2019-01-20 12:07:00"
        },
        {
          id: 9,
          name: "Antwon King",
          slug: "antwon-king",
          created_at: "2019-01-20 12:08:00"
        },
        {
          id: 10,
          name: "Obeah",
          slug: "obeah",
          created_at: "2019-01-20 12:09:00"
        },
        {
          id: 11,
          name: "The Impossebulls",
          slug: "impossebulls",
          created_at: "2019-01-20 12:10:00"
        },
        {
          id: 12,
          name: "Jelani Malik",
          slug: "jelani-malik",
          created_at: "2019-01-20 12:11:00"
        }
      ]);
    });
};
