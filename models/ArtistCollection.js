import moment from "moment";
import slug from "slug";
import knex from "../lib/connection";
import Artist from "./Artist";

class ArtistCollection {
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

    this.items = results.map(function(record) {
      return new Artist(record);
    });

    return this.items;
  }

  async count() {
    return await knex.count("* as count").from(this.tablename);
  }

  async findBySlug(slug) {
    const result = await knex
      .select("*")
      .from(this.tablename)
      .where("slug", slug)
      .limit(1);

    this.items = result[0];

    return this.items;
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
    const artist = { ...data };

    const result = await knex
      .count("name as count")
      .from(this.tablename)
      .where("name", artist.name)
      .limit(1);

    const count = result[0].count;

    if (count > 0) {
      artist.slug = slug(`${artist.name} ${count}`, { lower: true });
    } else {
      artist.slug = slug(artist.name, { lower: true });
    }

    const id = await knex(this.tablename).insert(artist, ["id"]);

    const returnedArtist = await knex(this.tablename)
      .where("id", id[0])
      .limit(1);

    return await this.findBySlug(returnedArtist[0].slug);
  }
}

export default ArtistCollection;
