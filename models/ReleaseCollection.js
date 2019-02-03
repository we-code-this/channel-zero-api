import knex from "../lib/connection";
import Release from "./Release";

class ReleaseCollection {
  constructor() {
    this.tablename = "releases";
    this.items = undefined;
  }

  async get(params = {}) {
    const limit = params.limit ? params.limit : 10;
    const order = params.order ? params.order.toUpperCase() : "DESC";

    const res = await knex
      .select(
        `${this.tablename}.*`,
        "artists.name as artist_name",
        "artists.slug as artist_slug",
        "artists.created_at as artist_created_at",
        "artists.updated_at as artist_updated_at"
      )
      .from(this.tablename)
      .leftJoin("artists", `${this.tablename}.artist_id`, "artists.id")
      .where(`${this.tablename}.published`, true)
      .limit(limit)
      .orderBy("created_at", order);

    return Promise.all(
      res.map(async function(record) {
        return new Release(record).withRelated();
      })
    );
  }

  async findBySlug(slug) {
    const res = await knex
      .select(
        `${this.tablename}.*`,
        "artists.name as artist_name",
        "artists.slug as artist_slug",
        "artists.created_at as artist_created_at",
        "artists.updated_at as artist_updated_at"
      )
      .from(this.tablename)
      .leftJoin("artists", `${this.tablename}.artist_id`, "artists.id")
      .where(`${this.tablename}.slug`, slug);

    return new Release(res[0]).withRelated();
  }
}

export default ReleaseCollection;
