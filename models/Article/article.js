import knex from "../../lib/connection";

const tablename = "articles";

async function get(params = {}) {
  const limit = params.limit ? params.limit : 10;
  const order = params.order ? params.order.toUpperCase() : "DESC";

  const res = await knex
    .select("*")
    .from(tablename)
    .limit(limit)
    .orderBy("created_at", order);

  return res;
}

export default {
  get: get
};
