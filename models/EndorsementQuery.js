import moment from 'moment';
import knex from '../lib/connection';
import Endorsement from './Endorsement';

class EndorsementQuery {
  constructor() {
    this.tablename = 'endorsements';
    this.items = undefined;
  }

  async count() {
    return await knex.count('* as count').from(this.tablename);
  }

  async get(params = {}) {
    const offset = params.offset ? parseInt(params.offset) : 0;
    const limit = params.limit ? parseInt(params.limit) : 10;
    const order = params.order ? params.order.toUpperCase() : 'DESC';
    const type = params.type ? params.type : undefined;
    const relatedId = params.related_id ? params.related_id : undefined;

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
}

export default EndorsementQuery;
