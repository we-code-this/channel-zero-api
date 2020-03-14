import moment from 'moment';
import knex from '../lib/connection';
import ReleaseCredit from './ReleaseCredit';
import { normalizeID, normalizeCount } from '../lib/utilities';

class ReleaseCreditQuery {
  constructor() {
    this.tablename = 'release_credits';
    this.items = undefined;
  }

  select() {
    return knex.select(`${this.tablename}.*`).from(this.tablename);
  }

  async create(data) {
    const creditData = { ...data };

    const credit = new ReleaseCredit(creditData, true);

    const isValid = credit.valid();

    if (isValid) {
      const id = await knex(this.tablename).insert(
        {
          release_id: credit.release_id,
          label: credit.label,
          value: credit.value,
          url: credit.url,
        },
        ['id'],
      );

      return await this.findById(normalizeID(id));
    } else {
      return { errors: credit.validationErrors() };
    }
  }

  async delete(id) {
    const delResponse = await knex(this.tablename)
      .where('id', id)
      .del();

    return delResponse;
  }

  async deleteByReleaseId(releaseId) {
    const delResponse = await knex(this.tablename)
      .where('release_id', releaseId)
      .del();

    return delResponse;
  }

  async findById(id) {
    const result = await knex
      .select('*')
      .from(this.tablename)
      .where('id', id);

    if (result.length > 0) {
      return new ReleaseCredit(result[0]);
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
        return new ReleaseCredit(record);
      }),
    );
  }

  async getByReleaseId(releaseId) {
    let res = await this.select()
      .where('release_id', releaseId)
      .orderBy('created_at', 'ASC');

    return Promise.all(
      res.map(async function(record) {
        return new ReleaseCredit(record);
      }),
    );
  }

  async update(updatedFields) {
    const { id, ...remainingUpdatedFields } = updatedFields;
    const oldCredit = await this.findById(id);

    const data = {
      ...oldCredit,
      ...remainingUpdatedFields,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    const credit = new ReleaseCredit(data);
    const isValid = credit.valid();

    if (isValid) {
      await knex(this.tablename)
        .where('id', id)
        .update({
          label: credit.name,
          value: credit.value,
          url: credit.url,
          updated_at: credit.updated_at,
        });

      return await this.findById(id);
    } else {
      return { errors: credit.validationErrors() };
    }
  }
}

export default ReleaseCreditQuery;
