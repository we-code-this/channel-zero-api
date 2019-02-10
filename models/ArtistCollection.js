import knex from "../lib/connection";
import Artist from "./Artist";

class ArtistCollection {
  constructor() {
    this.tablename = "artists";
    this.items = undefined;
  }

  async get(params = {}) {
    const limit = params.limit ? params.limit : 10;
    const order = params.order ? params.order.toUpperCase() : "DESC";

    if (this.items) {
      return items;
    }

    const results = await knex
      .select("*")
      .from(this.tablename)
      .limit(limit)
      .orderBy("created_at", order);

    this.items = results.map(function(record) {
      return new Artist(record);
    });

    return this.items;
  }
}

export default ArtistCollection;
