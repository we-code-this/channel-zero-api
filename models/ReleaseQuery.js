import knex from "../lib/connection";
import Release from "./Release";

class ReleaseQuery {
  constructor() {
    this.tablename = "releases";
    this.items = undefined;
  }

  select() {
    return knex
      .select(
        `${this.tablename}.*`,
        "artists.name as artist_name",
        "artists.slug as artist_slug",
        "artists.description as artist_description",
        "artists.created_at as artist_created_at",
        "artists.updated_at as artist_updated_at",
        "labels.name as label_name",
        "labels.slug as label_slug",
        "labels.created_at as label_created_at",
        "labels.updated_at as label_updated_at"
      )
      .from(this.tablename)
      .leftJoin("artists", `${this.tablename}.artist_id`, "artists.id")
      .leftJoin("labels", `${this.tablename}.label_id`, "labels.id");
  }

  async create(data) {
    const releaseData = { ...data };
    const release = new Release(releaseData, true);
    const isValid = release.valid();
    await release.generateSlug();

    if (isValid && release.saveFile()) {
      const id = await knex(this.tablename).insert(
        {
          artist_id: release.artist_id,
          label_id: release.label_id,
          title: release.title,
          slug: release.slug,
          description: release.description,
          filename: release.filename
        },
        ["id"]
      );

      const res = (await this.select()
        .where(`${this.tablename}.id`, id[0])
        .limit(1))[0];

      return new Release(res).withRelated();
    } else {
      return { errors: release.validationErrors() };
    }
  }

  async count() {
    return await knex.count("* as count").from(this.tablename);
  }

  async get(params = {}) {
    const limit = params.limit ? parseInt(params.limit) : 10;
    const order = params.order ? params.order.toUpperCase() : "DESC";

    const res = await this.select()
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
    const res = await this.select().where(`${this.tablename}.slug`, slug);

    if (res.length > 0) {
      return new Release(res[0]).withRelated();
    } else {
      return undefined;
    }
  }
}

export default ReleaseQuery;
