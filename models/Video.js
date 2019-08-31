import Model from './Model';
import validator from 'validator';
import { sanitize } from '../lib/strings';

class Video extends Model {
  constructor(data, create) {
    super(data, create);

    this.src = sanitize(this.src);
  }

  valid() {
    let valid = false;

    valid = validator.isLength(this.src, { min: 1, max: 255 });

    if (!valid) {
      this.errors.push({ field: 'src', message: 'Invalid length' });
    }

    console.log('isURL:', validator.isURL(this.src));

    valid = valid && validator.isURL(this.src);

    if (!valid) {
      this.errors.push({ field: 'src', message: 'Invalid URL' });
    }

    return valid;
  }

  validationErrors() {
    return this.errors;
  }
}

export default Video;
