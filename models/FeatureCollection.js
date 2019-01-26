import knex from "../lib/connection";
import Feature from "./Feature";

class FeatureCollection {
  constructor() {
    this.tablename = "features";
    this.items = undefined;
  }

  async query(params = {}) {
    if (this.items) {
      return items;
    }

    const limit = params.limit ? params.limit : 10;
    const order = params.order ? params.order.toUpperCase() : "DESC";

    const results = await knex
      .select(
        `${this.tablename}.*`,
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
      .from(this.tablename)
      .leftJoin("articles", `${this.tablename}.article_id`, "articles.id")
      .leftJoin("videos", `${this.tablename}.video_id`, "videos.id")
      .where(`${this.tablename}.published`, true)
      .limit(limit)
      .orderBy("created_at", order);

    this.items = results.map(function(record) {
      return new Feature(record);
    });

    return this.items;
  }

  async get(params) {
    return await this.query(params);
  }

  async current() {
    return (await this.query({ limit: 1 }))[0];
  }
}

export default FeatureCollection;
