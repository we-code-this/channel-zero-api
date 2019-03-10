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
}

export default VendorQuery;
