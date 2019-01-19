import knex from "../../lib/connection";

const tablename = "ads";

async function get() {
  const res = await knex
    .select("*")
    .from(tablename)
    .where("published", true)
    .orderByRaw("RAND()")
    .limit(1);

  return res;
}

export default {
  get: get
};
