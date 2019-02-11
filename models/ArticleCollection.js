import knex from "../lib/connection";
import Article from "./Article";

class ArticleCollection {
  constructor() {
    this.tablename = "articles";
    this.items = undefined;
  }

  async get(params = {}) {
    const limit = params.limit ? parseInt(params.limit) : 10;
    const order = params.order ? params.order.toUpperCase() : "DESC";

    if (this.items) {
      return items;
    }

    const results = await knex
      .select("*")
      .from(this.tablename)
      .where("published", true)
      .limit(limit)
      .orderBy("created_at", order);

    this.items = results.map(function(record) {
      return new Article(record);
    });

    return this.items;
  }
}

export default ArticleCollection;
