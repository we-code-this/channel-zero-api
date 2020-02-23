import validator from 'validator';
import knex from '../lib/connection';
import moment from 'moment';
import Model from './Model';

import { sanitize } from '../lib/strings';

class Release extends Model {
  constructor(data, create) {
    super(data, create);

    this.name = sanitize(this.name);
  }

  valid() {
    let valid = false;
    valid = this.validName();

    return valid;
  }

  validName() {
    let valid = validator.isLength(this.name, { min: 1, max: 255 });

    if (!valid) {
      this.errors.push({ field: 'name', message: 'Invalid length' });
    }

    return valid;
  }

  validationErrors() {
    return this.errors;
  }
}

export default Release;
