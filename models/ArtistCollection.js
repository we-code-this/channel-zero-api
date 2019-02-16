import knex from "../lib/connection";
import Artist from "./Artist";

class ArtistCollection {
  constructor() {
    this.tablename = "artists";
    this.items = undefined;
  }

  async get(params = {}) {
    const offset = params.offset ? parseInt(params.offset) : 0;
    const limit = params.limit ? parseInt(params.limit) : 10;
    const order = params.order ? params.order.toUpperCase() : "DESC";

    if (this.items) {
      return items;
    }

    const results = await knex
      .select("*")
      .from(this.tablename)
      .limit(limit)
      .offset(offset)
      .orderBy("created_at", order);

    this.items = results.map(function(record) {
      return new Artist(record);
    });

    return this.items;
  }

  async count() {
    return await knex.count("* as count").from(this.tablename);
  }

  async findBySlug(slug) {
    const result = await knex
      .select("*")
      .from(this.tablename)
      .where("slug", slug)
      .limit(1);

    this.items = result;

    return this.items;
  }
}

export default ArtistCollection;
