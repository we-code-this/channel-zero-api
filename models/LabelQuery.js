import knex from "../lib/connection";
import Label from "./Label";

class LabelQuery {
  constructor() {
    this.tablename = "labels";
    this.items = undefined;
  }

  async get(params = {}) {
    const offset = params.offset ? parseInt(params.offset) : 0;
    const limit = params.limit ? parseInt(params.limit) : 10;
    const order = params.order ? params.order.toUpperCase() : "DESC";

    const results = await knex
      .select("*")
      .from(this.tablename)
      .limit(limit)
      .offset(offset)
      .orderBy("created_at", order);

    this.items = results.map(function(record) {
      return new Label(record);
    });

    return this.items;
  }

  async count() {
    return await knex.count("* as count").from(this.tablename);
  }
}

export default LabelQuery;
