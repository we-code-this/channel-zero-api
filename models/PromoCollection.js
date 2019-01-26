import knex from "../lib/connection";
import Promo from "./Promo";

class PromoCollection {
  constructor() {
    this.tablename = "promos";
    this.items = undefined;
  }

  async get(params = {}) {
    const limit = params.limit ? params.limit : 10;
    const order = params.order ? params.order.toUpperCase() : "DESC";

    const where = params.location
      ? { location: params.location, published: true }
      : { published: true };

    const results = await knex
      .select("*")
      .from(this.tablename)
      .where(where)
      .limit(limit)
      .orderBy("created_at", order);

    this.items = results.map(function(record) {
      return new Promo(record);
    });

    return this.items;
  }
}

export default PromoCollection;
