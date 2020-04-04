import validator from 'validator';
import Model from './Model';

import { sanitize } from '../lib/strings';

class ReleaseVendor extends Model {
  constructor(data, create) {
    super(data, create);

    this.url = sanitize(this.url);
  }

  valid() {
    let valid = false;

    valid = this.validUrl();

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

export default ReleaseVendor;
