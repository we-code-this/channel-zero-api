import moment from 'moment';
import knex from '../lib/connection';
import ReleaseVendor from './ReleaseVendor';
import { normalizeID, normalizeCount } from '../lib/utilities';

class ReleaseVendorQuery {
  constructor() {
    this.tablename = 'release_vendors';
    this.items = undefined;
  }

  async create(data) {
    const vendorData = { ...data };

    const vendor = new ReleaseVendor(vendorData, true);

    const isValid = vendor.valid();

    if (isValid) {
      const id = await knex(this.tablename).insert(
        {
          release_id: vendor.release_id,
          vendor_id: vendor.vendor_id,
          url: vendor.url,
        },
        ['id'],
      );

      return await this.findById(normalizeID(id));
    } else {
      return { errors: vendor.validationErrors() };
    }
  }

  async delete(id) {
    const delResponse = await knex(this.tablename)
      .where('id', id)
      .del();

    return delResponse;
  }

  async findById(id) {
    const result = await knex
      .select('*')
      .from(this.tablename)
      .where('id', id);

    if (result.length > 0) {
      return new ReleaseVendor(result[0]);
    } else {
      return undefined;
    }
  }

  async update(updatedFields) {
    const { id, ...remainingUpdatedFields } = updatedFields;
    const oldVendor = await this.findById(id);

    const data = {
      ...oldVendor,
      ...remainingUpdatedFields,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    const vendor = new ReleaseVendor(data);
    const isValid = vendor.valid();

    if (isValid) {
      await knex(this.tablename).where('id', id).update({
        vendor_id: vendor.vendor_id,
        url: vendor.url,
        updated_at: vendor.updated_at,
      });

      return await this.findById(id);
    } else {
      return { errors: vendor.validationErrors() };
    }
  }
}

export default ReleaseVendorQuery;
