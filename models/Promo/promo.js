import knex from "../../lib/connection";

const tablename = "promos";

async function get(params = {}) {
  const limit = params.limit ? params.limit : 10;
  const order = params.order ? params.order.toUpperCase() : "DESC";

  const where = params.location
    ? { location: params.location, published: true }
    : { published: true };

  const res = await knex
    .select("*")
    .from(tablename)
    .where(where)
    .limit(limit)
    .orderBy("created_at", order);

  return res;
}

export default {
  get: get
};
