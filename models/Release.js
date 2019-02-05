import knex from "../lib/connection";
import Artist from "./Artist";
import Endorsement from "./Endorsement";
import Model from "./Model";
import Vendor from "./Vendor";
import ReleaseCredit from "./ReleaseCredit";

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
    this.credits = undefined;
    this.endorsements = undefined;
  }

  async withRelated() {
    await this.withVendors();
    await this.withCredits();
    await this.withEndorsements();

    return this;
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

  async withCredits() {
    const results = await knex
      .select("*")
      .from("release_credits")
      .where("release_credits.release_id", this.id)
      .orderBy("release_credits.id", "ASC");

    this.credits = results.map(function(record) {
      return new ReleaseCredit(record);
    });

    return this;
  }

  async withEndorsements() {
    const results = await knex
      .select("endorsements.*")
      .from("release_endorsements")
      .leftJoin(
        "endorsements",
        "release_endorsements.endorsement_id",
        "endorsements.id"
      )
      .where("release_endorsements.release_id", this.id)
      .orderBy("endorsements.id", "ASC");

    this.endorsements = results.map(function(record) {
      return new Endorsement(record);
    });

    return this;
  }
}

export default Release;
