import moment from 'moment';
import knex from '../lib/connection';
import Ad from './Ad';
import { normalizeID, normalizeCount } from '../lib/utilities';

class AdQuery {
  constructor() {
    this.tablename = 'ads';
    this.items = undefined;
  }

  async count() {
    const count = await knex.count('* as count').from(this.tablename);
    return normalizeCount(count);
  }

  async create(data) {
    const adData = { ...data };
    const ad = new Ad(adData, true);
    const isValid = ad.valid();

    if (
      isValid &&
      (await ad.saveDesktopFile()) &&
      (await ad.saveMobileFile())
    ) {
      const id = await knex(this.tablename).insert(
        {
          user_id: ad.user_id,
          url: ad.url,
          alt: ad.alt,
          desktop_filename: ad.desktop_filename,
          mobile_filename: ad.mobile_filename,
          published: ad.published,
        },
        ['id'],
      );

      const res = (
        await knex
          .select('*')
          .from(this.tablename)
          .where(`${this.tablename}.id`, normalizeID(id))
      )[0];

      return new Ad(res);
    } else {
      return { errors: ad.validationErrors() };
    }
  }

  async delete(id) {
    const ad = await this.findById(id);

    if (ad && ad.deleteDesktopFile() && ad.deleteMobileFile()) {
      const delResponse = await knex(this.tablename)
        .where('id', id)
        .del();
      return delResponse;
    } else {
      return false;
    }
  }

  async findById(id) {
    const res = await knex
      .select('*')
      .from(this.tablename)
      .where(`${this.tablename}.id`, id);

    if (res.length > 0) {
      return new Ad(res[0]);
    } else {
      return undefined;
    }
  }

  async get(params = {}) {
    const offset = params.offset ? parseInt(params.offset) : 0;
    const limit = params.limit ? parseInt(params.limit) : 10;
    const order = params.order ? params.order.toUpperCase() : 'DESC';

    const results = await knex
      .select('*')
      .from(this.tablename)
      .limit(limit)
      .offset(offset)
      .orderBy('created_at', order);

    this.items = results.map(function (record) {
      return new Ad(record);
    });

    return this.items;
  }

  async publish(id) {
    const response = await knex(this.tablename)
      .where('id', id)
      .update({ published: 1 });

    return response === 1 ? await this.findById(id) : undefined;
  }

  async random() {
    const result = await knex
      .select('*')
      .from(this.tablename)
      .where('published', true)
      .orderByRaw('random()')
      .limit(1);

    if (result.length > 0) {
      return new Ad(result[0]);
    } else {
      return undefined;
    }
  }

  async unpublish(id) {
    const response = await knex(this.tablename)
      .where('id', id)
      .update({ published: 0 });

    return response === 1 ? await this.findById(id) : undefined;
  }

  async update(updatedFields) {
    const { id, ...remainingUpdatedFields } = updatedFields;
    const oldAd = await this.findById(id);

    const data = {
      ...oldAd,
      ...remainingUpdatedFields,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    const ad = new Ad(data);
    const isValid = ad.valid();

    if (
      isValid &&
      (await ad.saveDesktopFile()) &&
      (await ad.saveMobileFile())
    ) {
      await knex(this.tablename).where('id', id).update({
        url: ad.url,
        alt: ad.alt,
        updated_at: ad.updated_at,
      });

      return await this.findById(id);
    } else {
      return { errors: ad.validationErrors() };
    }
  }
}

export default AdQuery;
