import validator from 'validator';
import knex from '../lib/connection';
import moment from 'moment';
import Model from './Model';

import { sanitize, slugify } from '../lib/strings';

class ReleaseTrack extends Model {
  constructor(data, create) {
    super(data, create);

    if (this.number) {
      this.number = parseInt(sanitize(this.number.toString()));
    }

    this.title = sanitize(this.title);
  }

  valid() {
    let valid = false;
    valid = this.validTitle() && this.validNumber();

    return valid;
  }

  validTitle() {
    let valid = validator.isLength(this.title, { min: 1, max: 255 });

    if (!valid) {
      this.errors.push({ field: 'title', message: 'Invalid length' });
    }

    return valid;
  }

  validNumber() {
    let valid = validator.isInt(this.number.toString(), { min: 1 });

    if (!valid) {
      this.errors.push({
        field: 'number',
        message: 'Invalid length',
      });
    }

    return valid;
  }

  validationErrors() {
    return this.errors;
  }

  generateNumber(discCount) {
    if (!this.number) {
      this.number = parseInt(discCount) + 1;
    }
  }

  async generateSlug() {
    if (this.create) {
      this.slug = await slugify(
        this.title,
        'release_tracks',
        'slug',
        { field: 'disc_id', value: this.disc_id },
      );
    }
  }
}

export default ReleaseTrack;
