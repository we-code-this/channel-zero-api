import validator from 'validator';
import knex from '../lib/connection';
import moment from 'moment';
import Model from './Model';

import { sanitize } from '../lib/strings';

class ReleaseCredit extends Model {
  constructor(data, create) {
    super(data, create);

    this.label = sanitize(this.label);
    this.value = sanitize(this.value);
  }

  valid() {
    let valid = false;

    valid = this.validLabel();
    valid = valid && this.validValue();

    if (this.url && this.url !== '') {
      valid = valid && this.validUrl();
    }

    return valid;
  }

  validLabel() {
    let valid = validator.isLength(this.label, { min: 1, max: 255 });

    if (!valid) {
      this.errors.push({ field: 'label', message: 'Invalid length' });
    }

    return valid;
  }

  validValue() {
    let valid = validator.isLength(this.value, { min: 1, max: 255 });

    if (!valid) {
      this.errors.push({ field: 'value', message: 'Invalid length' });
    }

    return valid;
  }

  validUrl() {
    let valid = false;
    valid = validator.isURL(this.url);

    if (!valid) {
      this.errors.push({ field: 'url', message: 'Invalid URL' });
    }

    return valid;
  }

  validationErrors() {
    return this.errors;
  }
}

export default ReleaseCredit;
