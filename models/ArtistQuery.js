import moment from "moment";
import knex from "../lib/connection";
import Artist from "./Artist";

class ArtistQuery {
  constructor() {
    this.tablename = "artists";
    this.items = undefined;
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
        return await new Artist(record).withRelated();
      })
    );

    return this.items;
  }

  async getByName() {
    if (this.items) {
      return items;
    }

    const results = await knex
      .select("*")
      .from(this.tablename)
      .orderBy("name", "ASC");

    this.items = await Promise.all(
      results.map(async function(record) {
        return await new Artist(record).withRelated();
      })
    );

    return this.items;
  }

  async count() {
    return await knex.count("* as count").from(this.tablename);
  }

  async findById(id) {
    const result = await knex
      .select("*")
      .from(this.tablename)
      .where("id", id)
      .limit(1);

    if (result.length > 0) {
      return await new Artist(result[0]).withRelated();
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
      return await new Artist(result[0]).withRelated();
    } else {
      return undefined;
    }
  }

  async updateBySlug(slug, updatedFields) {
    const oldArtist = await this.findBySlug(slug);
    const data = {
      ...oldArtist,
      ...updatedFields,
      updated_at: moment().format("YYYY-MM-DD HH:mm:ss")
    };

    const artist = new Artist(data);

    const isValid = artist.valid();

    if (isValid) {
      await knex(this.tablename)
        .where("slug", slug)
        .update({
          name: artist.name,
          description: artist.description,
          updated_at: artist.updated_at
        });

      return await this.findBySlug(slug);
    } else {
      return { errors: artist.validationErrors() };
    }
  }

  async delete(id) {
    return await knex(this.tablename)
      .where("id", id)
      .del();
  }

  async create(data) {
    const artistData = { ...data };

    const artist = new Artist(artistData, true);
    const isValid = artist.valid();
    await artist.generateSlug();

    if (isValid) {
      const id = await knex(this.tablename).insert(
        {
          name: artist.name,
          slug: artist.slug,
          description: artist.description
        },
        ["id"]
      );

      return await this.findById(id[0]);
    } else {
      return { errors: artist.validationErrors() };
    }
  }
}

export default ArtistQuery;
