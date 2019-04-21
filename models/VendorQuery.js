import knex from "../lib/connection";
import Vendor from "./Vendor";

class VendorQuery {
  constructor() {
    this.tablename = "vendors";
    this.items = null;
  }

  async all(order = "ASC") {
    if (this.items) {
      return this.items;
    }

    const results = await knex
      .select("*")
      .from(this.tablename)
      .orderBy("name", order);

    this.items = results.map(function(record) {
      return new Vendor(record);
    });

    return this.items;
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

    this.items = await Promise.all(
      results.map(async function(record) {
        return await new Vendor(record);
      })
    );

    return this.items;
  }

  async count() {
    return await knex.count("* as count").from(this.tablename);
  }
}

export default VendorQuery;
