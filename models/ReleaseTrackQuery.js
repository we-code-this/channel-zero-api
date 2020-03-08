import moment from 'moment';
import knex from '../lib/connection';
import ReleaseTrack from './ReleaseTrack';
import { normalizeID, normalizeCount } from '../lib/utilities';

class ReleaseTrackQuery {
  constructor() {
    this.tablename = 'release_tracks';
    this.items = undefined;
  }

  select() {
    return knex.select(`${this.tablename}.*`).from(this.tablename);
  }

  async count() {
    const count = await knex.count('* as count').from(this.tablename);
    return normalizeCount(count);
  }

  async create(data) {
    const trackData = { ...data };

    const track = new ReleaseTrack(trackData, true);

    track.generateNumber((await this.discCount(track.disc_id)).count);
    await track.generateSlug();

    const isValid = track.valid();

    if (isValid) {
      await knex(this.tablename).insert(
        {
          number: track.number,
          disc_id: track.disc_id,
          title: track.title,
          slug: track.slug,
        },
        ['id'],
      );

      return await this.findByDiscIdAndSlug(
        track.disc_id,
        track.slug,
      );
    } else {
      return { errors: track.validationErrors() };
    }
  }

  async delete(id) {
    const delResponse = await knex(this.tablename)
      .where('id', id)
      .del();

    return delResponse;
  }

  async deleteByDiscId(discId) {
    const delResponse = await knex(this.tablename)
      .where('disc_id', discId)
      .del();

    return delResponse;
  }

  async discCount(discId) {
    const count = await knex
      .count('* as count')
      .from(this.tablename)
      .where('disc_id', discId);

    return normalizeCount(count);
  }

  async findById(id) {
    const result = await knex
      .select('*')
      .from(this.tablename)
      .where('id', id);

    if (result.length > 0) {
      return new ReleaseTrack(result[0]);
    } else {
      return undefined;
    }
  }

  async findByDiscIdAndSlug(discId, slug) {
    const result = await knex
      .select('*')
      .from(this.tablename)
      .where('disc_id', discId)
      .where('slug', slug);

    if (result.length > 0) {
      return new ReleaseTrack(result[0]);
    } else {
      return undefined;
    }
  }

  async get(params = {}) {
    const offset = params.offset ? parseInt(params.offset) : 0;
    const limit = params.limit ? parseInt(params.limit) : 10;
    const order = params.order ? params.order.toUpperCase() : 'DESC';

    let res = await this.select()
      .limit(limit)
      .offset(offset)
      .orderBy('created_at', order);

    return Promise.all(
      res.map(async function(record) {
        return new ReleaseTrack(record);
      }),
    );
  }

  async update(updatedFields) {
    const { id, ...remainingUpdatedFields } = updatedFields;
    const oldTrack = await this.findById(id);

    const data = {
      ...oldTrack,
      ...remainingUpdatedFields,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    const track = new ReleaseTrack(data);
    const isValid = track.valid();

    if (isValid) {
      await knex(this.tablename)
        .where('id', id)
        .update({
          title: track.title,
          number: track.number,
          updated_at: track.updated_at,
        });

      return await this.findById(id);
    } else {
      return { errors: track.validationErrors() };
    }
  }
}

export default ReleaseTrackQuery;
