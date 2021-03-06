import moment from 'moment';
import knex from '../lib/connection';
import Vendor from './Vendor';
import { normalizeID, normalizeCount } from '../lib/utilities';

class VendorQuery {
  constructor() {
    this.tablename = 'vendors';
    this.items = null;
  }

  async all(order = 'ASC') {
    if (this.items) {
      return this.items;
    }

    const results = await knex
      .select('*')
      .from(this.tablename)
      .orderBy('name', order);

    this.items = results.map(function (record) {
      return new Vendor(record);
    });

    return this.items;
  }

  async delete(id) {
    return await knex(this.tablename).where('id', id).del();
  }

  async findById(id) {
    const result = await knex
      .select('*')
      .from(this.tablename)
      .where('id', id);

    if (result.length > 0) {
      return await new Vendor(result[0]);
    } else {
      return undefined;
    }
  }

  async get(params = {}) {
    const offset = params.offset ? parseInt(params.offset) : 0;
    const limit = params.limit ? parseInt(params.limit) : 10;
    const order = params.order ? params.order.toUpperCase() : 'DESC';

    if (this.items) {
      return items;
    }

    const results = await knex
      .select('*')
      .from(this.tablename)
      .limit(limit)
      .offset(offset)
      .orderBy('created_at', order);

    this.items = await Promise.all(
      results.map(async function (record) {
        return await new Vendor(record);
      }),
    );

    return this.items;
  }

  async count() {
    const count = await knex.count('* as count').from(this.tablename);
    return normalizeCount(count);
  }

  async create(data) {
    const vendorData = { ...data };

    const vendor = new Vendor(vendorData, true);
    const isValid = vendor.valid();

    if (isValid) {
      const id = await knex(this.tablename).insert(
        {
          user_id: vendor.user_id,
          name: vendor.name,
          icon_class: vendor.icon_class,
        },
        ['id'],
      );

      return await this.findById(normalizeID(id));
    } else {
      return { errors: vendor.validationErrors() };
    }
  }

  async getByName() {
    if (this.items) {
      return this.items;
    }

    const results = await knex
      .select('*')
      .from(this.tablename)
      .orderBy('name', 'ASC');

    this.items = await Promise.all(
      results.map(async function (record) {
        return await new Vendor(record);
      }),
    );

    return this.items;
  }

  async update(updatedFields) {
    const { id, ...remainingUpdatedFields } = updatedFields;
    const oldVendor = await this.findById(id);
    const data = {
      ...oldVendor,
      ...remainingUpdatedFields,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    const vendor = new Vendor(data);

    const isValid = vendor.valid();

    if (isValid) {
      await knex(this.tablename).where('id', id).update({
        name: vendor.name,
        icon_class: vendor.icon_class,
        updated_at: vendor.updated_at,
      });

      return await this.findById(id);
    } else {
      return { errors: vendor.validationErrors() };
    }
  }
}

export default VendorQuery;
