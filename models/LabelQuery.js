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

  async create(data) {
    const labelData = { ...data };

    const label = new Label(labelData, true);
    const isValid = label.valid();
    await label.generateSlug();

    if (isValid) {
      const id = await knex(this.tablename).insert(
        {
          name: label.name,
          slug: label.slug
        },
        ["id"]
      );

      return await this.findById(id[0]);
    } else {
      return { errors: label.validationErrors() };
    }
  }

  async findById(id) {
    const result = await knex
      .select("*")
      .from(this.tablename)
      .where("id", id)
      .limit(1);

    if (result.length > 0) {
      return new Label(result[0]);
    } else {
      return undefined;
    }
  }

  async findBySlug(slug) {
    const result = await knex
      .select("*")
      .from(this.tablename)
      .where("slug", slug)
      .limit(1);

    if (result.length > 0) {
      return new Label(result[0]);
    } else {
      return undefined;
    }
  }
}

export default LabelQuery;
