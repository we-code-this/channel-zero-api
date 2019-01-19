import knex from "../../lib/connection";

const tablename = "ads";

async function get() {
  const res = await knex
    .select("*")
    .from(tablename)
    .orderByRaw("RAND()")
    .limit(1);

  return res;
}

export default {
  get: get
};
