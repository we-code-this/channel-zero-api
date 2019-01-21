import knex from "../../lib/connection";

const tablename = "features";

function buildFeature(record) {
  return {
    id: record.id,
    published: record.published,
    created_at: record.created_at,
    updated_at: record.updated_at,
    article: {
      id: record.article_id,
      url: record.article_url,
      title: record.article_title,
      summary: record.article_summary,
      published: record.article_published,
      created_at: record.created_at,
      updated_at: record.updated_at
    },
    video: {
      id: record.video_id,
      src: record.video_src,
      created_at: record.created_at,
      updated_at: record.updated_at
    }
  };
}

async function query(params = {}) {
  const limit = params.limit ? params.limit : 10;
  const order = params.order ? params.order.toUpperCase() : "DESC";

  return await knex
    .select(
      `${tablename}.*`,
      "articles.url as article_url",
      "articles.title as article_title",
      "articles.summary as article_summary",
      "articles.published as article_published",
      "articles.created_at as article_created_at",
      "articles.updated_at as article_updated_at",
      "videos.src as video_src",
      "videos.created_at as video_created_at",
      "videos.updated_at as video_updated_at"
    )
    .from(tablename)
    .leftJoin("articles", `${tablename}.article_id`, "articles.id")
    .leftJoin("videos", `${tablename}.video_id`, "videos.id")
    .where(`${tablename}.published`, true)
    .limit(limit)
    .orderBy("created_at", order);
}

async function get(params) {
  const res = await query(params);

  return res.map(function(feature) {
    return buildFeature(feature);
  });
}

async function current() {
  const res = await query({ limit: 1 });

  return buildFeature(res[0]);
}

export default {
  get: get,
  current: current
};
