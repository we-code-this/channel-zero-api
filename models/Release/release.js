import knex from "../../lib/connection";

const tablename = "releases";

function buildRelease(record) {
  return {
    id: record.id,
    title: record.title,
    slug: record.slug,
    filename: record.filename,
    published: record.published,
    created_at: record.created_at,
    updated_at: record.updated_at,
    artist: {
      id: record.artist_id,
      name: record.artist_name,
      slug: record.artist_slug,
      created_at: record.created_at,
      updated_at: record.updated_at
    }
  };
}

async function get(params = {}) {
  const limit = params.limit ? params.limit : 10;
  const order = params.order ? params.order.toUpperCase() : "DESC";

  const res = await knex
    .select(
      "releases.*",
      "artists.name as artist_name",
      "artists.slug as artist_slug",
      "artists.created_at as artist_created_at",
      "artists.updated_at as artist_updated_at"
    )
    .from(tablename)
    .leftJoin("artists", "releases.artist_id", "artists.id")
    .where("published", true)
    .limit(limit)
    .orderBy("created_at", order);

  return res.map(function(release) {
    return buildRelease(release);
  });
}

async function findBySlug(slug) {
  const res = await knex
    .select(
      "releases.*",
      "artists.name as artist_name",
      "artists.slug as artist_slug",
      "artists.created_at as artist_created_at",
      "artists.updated_at as artist_updated_at"
    )
    .from(tablename)
    .leftJoin("artists", "releases.artist_id", "artists.id")
    .where("releases.slug", slug);

  return buildRelease(res[0]);
}

export default {
  get: get,
  findBySlug: findBySlug
};
