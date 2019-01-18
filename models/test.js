const knex = require("../lib/connection");

knex
  .select("*")
  .from("users")
  .map(row => {
    console.log(row.name);
  })
  .then(res => {
    process.exit(1);
  })
  .catch(err => {
    console.error("error", err);
    process.exit(1);
  });
