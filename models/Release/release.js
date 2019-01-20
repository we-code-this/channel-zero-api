import knex from "../../lib/connection";

const tablename = "releases";

async function get(params = {}) {
  const limit = params.limit ? params.limit : 10;
  const order = params.order ? params.order.toUpperCase() : "DESC";

  const res = await knex
    .select("*")
    .from(tablename)
    .where("published", true)
    .limit(limit)
    .orderBy("created_at", order);

  return res;
}

async function findBySlug(slug) {
  const res = await knex
    .select("*")
    .from(tablename)
    .where("slug", slug);

  return res[0];
}

export default {
  get: get,
  findBySlug: findBySlug
};
