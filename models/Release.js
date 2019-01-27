import knex from "../lib/connection";
import Artist from "./Artist";
import Model from "./Model";
import Vendor from "./Vendor";

class Release extends Model {
  constructor(data) {
    super(data);

    this.artist = new Artist({
      id: data.artist_id,
      name: data.artist_name,
      slug: data.artist_slug,
      created_at: data.created_at,
      updated_at: data.updated_at
    });

    this.vendors = undefined;
  }

  async withVendors() {
    const results = await knex
      .select(
        `release_vendors.id`,
        `release_vendors.url`,
        "vendors.name as name",
        "vendors.icon_class as icon_class"
      )
      .from("release_vendors")
      .leftJoin("vendors", `release_vendors.vendor_id`, "vendors.id")
      .where("release_vendors.release_id", this.id)
      .orderBy("vendors.name", "ASC");

    this.vendors = results.map(function(record) {
      return new Vendor(record);
    });

    return this;
  }
}

export default Release;
