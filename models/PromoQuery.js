import knex from '../lib/connection';
import Promo from './Promo';
import moment from 'moment';

class PromoQuery {
  constructor() {
    this.tablename = 'promos';
    this.items = undefined;
  }

  async count() {
    return await knex.count('* as count').from(this.tablename);
  }

  async create(data) {
    const promoData = { ...data };
    const promo = new Promo(promoData, true);
    const isValid = promo.valid();

    if (isValid && promo.saveFile()) {
      const id = await knex(this.tablename).insert(
        {
          user_id: promo.user_id,
          name: promo.name,
          url: promo.url,
          filename: promo.filename,
          location: promo.location,
          published: promo.published
        },
        ['id']
      );

      const res = await this.findById(id[0]);

      return new Promo(res);
    } else {
      return { errors: promo.validationErrors() };
    }
  }

  async delete(id) {
    const promo = await this.findById(id);

    if (promo && promo.deleteFile()) {
      return await knex(this.tablename)
        .where('id', id)
        .del();
    } else {
      return false;
    }
  }

  async findById(id) {
    const result = await knex
      .select('*')
      .from(this.tablename)
      .where('id', id)
      .limit(1);

    if (result.length > 0) {
      return new Promo(result[0]);
    } else {
      return undefined;
    }
  }

  async get(params = {}, unpublished = false) {
    const offset = params.offset ? parseInt(params.offset) : 0;
    const limit = params.limit ? parseInt(params.limit) : 10;
    const order = params.order ? params.order.toUpperCase() : 'DESC';

    let where;

    if (unpublished) {
      where = params.location ? { location: params.location } : {};
    } else {
      where = params.location
        ? { location: params.location, published: true }
        : { published: true };
    }

    const results = await knex
      .select('*')
      .from(this.tablename)
      .where(where)
      .limit(limit)
      .offset(offset)
      .orderBy('created_at', order);

    this.items = results.map(function(record) {
      return new Promo(record);
    });

    return this.items;
  }

  async publish(id) {
    const response = await knex(this.tablename)
      .where('id', id)
      .update({ published: 1 });

    return response === 1 ? await this.findById(id) : undefined;
  }

  async unpublish(id) {
    const response = await knex(this.tablename)
      .where('id', id)
      .update({ published: 0 });

    return response === 1 ? await this.findById(id) : undefined;
  }

  async update(updatedFields) {
    const { id, ...remainingUpdatedFields } = updatedFields;
    const oldPromo = await this.findById(id);

    const data = {
      ...oldPromo,
      ...remainingUpdatedFields,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    const promo = new Promo(data);
    const isValid = promo.valid();

    if (isValid && promo.saveFile()) {
      await knex(this.tablename)
        .where('id', id)
        .update({
          name: promo.name,
          url: promo.url,
          location: promo.location,
          updated_at: promo.updated_at
        });

      return await this.findById(id);
    } else {
      return { errors: promo.validationErrors() };
    }
  }
}

export default PromoQuery;
