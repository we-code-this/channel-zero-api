import moment from 'moment';
import knex from '../lib/connection';
import Endorsement from './Endorsement';
import { normalizeID, normalizeCount } from '../lib/utilities';

class EndorsementQuery {
  constructor() {
    this.tablename = 'endorsements';
    this.items = undefined;
  }

  async count() {
    const count = await knex.count('* as count').from(this.tablename);
    return normalizeCount(count);
  }

  async create(data) {
    const endorsementData = { ...data };
    const endorsement = new Endorsement(endorsementData, true);
    const isValid = endorsement.valid();

    if (isValid) {
      const id = await knex(this.tablename).insert(
        {
          user_id: endorsement.user_id,
          related_id: endorsement.related_id,
          review: endorsement.review,
          reviewer: endorsement.reviewer,
          url: endorsement.url,
          type: endorsement.type,
        },
        ['id'],
      );

      return await this.findById(normalizeID(id));
    } else {
      return { errors: endorsement.validationErrors() };
    }
  }

  async delete(id) {
    return await knex(this.tablename)
      .where('id', id)
      .del();
  }

  async deleteByIdAndType(id, type) {
    const delResponse = await knex(this.tablename)
      .where('related_id', id)
      .where('type', type)
      .del();

    return delResponse;
  }

  async findById(id) {
    const result = await knex
      .select('*')
      .from(this.tablename)
      .where('id', id);

    if (result.length > 0) {
      return new Endorsement(result[0]);
    } else {
      return undefined;
    }
  }

  async get(params = {}) {
    const offset = params.offset ? parseInt(params.offset) : 0;
    const limit = params.limit ? parseInt(params.limit) : 10;
    const order = params.order ? params.order.toUpperCase() : 'DESC';
    const type = params.type ? params.type : undefined;
    const relatedId = params.related_id
      ? params.related_id
      : undefined;

    let results;

    if (type) {
      if (relatedId) {
        results = await knex
          .select('*')
          .from(this.tablename)
          .where('type', type)
          .where('related_id', relatedId)
          .orderBy('created_at', order);
      } else {
        results = await knex
          .select('*')
          .from(this.tablename)
          .where('type', type)
          .limit(limit)
          .offset(offset)
          .orderBy('created_at', order);
      }
    } else {
      results = await knex
        .select('*')
        .from(this.tablename)
        .limit(limit)
        .offset(offset)
        .orderBy('created_at', order);
    }

    this.items = results.map(function(record) {
      return new Endorsement(record);
    });

    return this.items;
  }

  async update(fieldData) {
    const { id, ...remainingFields } = fieldData;
    const oldEndorsement = await this.findById(id);
    const data = {
      ...oldEndorsement,
      ...remainingFields,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    const endorsement = new Endorsement(data);
    const isValid = endorsement.valid();

    if (isValid) {
      await knex(this.tablename)
        .where('id', id)
        .update({
          review: endorsement.review,
          reviewer: endorsement.reviewer,
          url: endorsement.url,
          updated_at: endorsement.updated_at,
        });

      return await this.findById(id);
    } else {
      return { errors: endorsement.validationErrors() };
    }
  }
}

export default EndorsementQuery;
