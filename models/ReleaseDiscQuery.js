import moment from 'moment';
import knex from '../lib/connection';
import ReleaseDisc from './ReleaseDisc';
import { normalizeID, normalizeCount } from '../lib/utilities';

class ReleaseDiscQuery {
  constructor() {
    this.tablename = 'release_discs';
    this.items = undefined;
  }

  select() {
    return knex.select(`${this.tablename}.*`).from(this.tablename);
  }

  async count() {
    const count = await knex.count('* as count').from(this.tablename);
    return normalizeCount(count);
  }

  async releaseCount(releaseId) {
    const count = await knex
      .count('* as count')
      .from(this.tablename)
      .where('release_id', releaseId);

    return normalizeCount(count);
  }

  async create(data) {
    const discData = { ...data };

    const disc = new ReleaseDisc(discData, true);
    const count = await this.releaseCount(disc.release_id);

    disc.sort = count.count;

    if (!disc.name) {
      disc.name = `Disc ${parseInt(disc.sort) + 1}`;
    }

    const isValid = disc.valid();

    if (isValid) {
      const id = await knex(this.tablename).insert(
        {
          sort: disc.sort,
          release_id: disc.release_id,
          name: disc.name,
        },
        ['id'],
      );

      return await this.findById(normalizeID(id));
    } else {
      return { errors: disc.validationErrors() };
    }
  }

  async delete(id) {
    const releaseId = (
      await knex
        .select('release_id')
        .from(this.tablename)
        .where('id', id)
    )[0].release_id;

    const delResponse = await knex(this.tablename)
      .where('id', id)
      .del();

    const discs = await knex
      .select(`${this.tablename}.*`)
      .from(this.tablename)
      .where('release_id', releaseId)
      .orderBy('sort', 'ASC');

    discs.map(async (disc, index) => {
      await knex(this.tablename)
        .where('id', disc.id)
        .update({
          sort: index,
          updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        });
    });

    return delResponse;
  }

  async findById(id) {
    const result = await knex
      .select('*')
      .from(this.tablename)
      .where('id', id);

    if (result.length > 0) {
      return new ReleaseDisc(result[0]);
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
        return new ReleaseDisc(record);
      }),
    );
  }

  async getByReleaseId(releaseId) {
    let res = await this.select()
      .where('release_id', releaseId)
      .orderBy('sort', 'ASC');

    return Promise.all(
      res.map(async function(record) {
        return new ReleaseDisc(record);
      }),
    );
  }

  async update(id, updatedFields) {
    const oldDisc = await this.findById(id);

    const data = {
      ...oldDisc,
      ...updatedFields,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    const disc = new ReleaseDisc(data);
    const isValid = disc.valid();

    if (isValid) {
      await knex(this.tablename)
        .where('id', id)
        .update({
          name: disc.name,
          updated_at: disc.updated_at,
        });

      return await this.findById(id);
    } else {
      return { errors: disc.validationErrors() };
    }
  }
}

export default ReleaseDiscQuery;
