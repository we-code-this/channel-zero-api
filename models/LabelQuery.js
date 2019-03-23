import knex from "../lib/connection";
import Label from "./Label";

class LabelQuery {
  constructor() {
    this.tablename = "labels";
    this.items = undefined;
  }

  async get(params = {}) {
    const limit = params.limit ? parseInt(params.limit) : 10;
    const order = params.order ? params.order.toUpperCase() : "DESC";

    const results = await knex
      .select("*")
      .from(this.tablename)
      .limit(limit)
      .orderBy("created_at", order);

    this.items = results.map(function(record) {
      return new Label(record);
    });

    return this.items;
  }
}

export default LabelQuery;
