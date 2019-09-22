import Model from './Model';
import validator from 'validator';
import { sanitize } from '../lib/strings';

class Video extends Model {
  constructor(data, create) {
    super(data, create);

    this.src = sanitize(this.src);
    this.title = sanitize(this.title);
  }

  valid() {
    let valid = false;

    valid = this.validSrc();
    valid = valid && this.validTitle();

    return valid;
  }

  validSrc() {
    let valid = false;
    valid = validator.isLength(this.src, { min: 1, max: 255 });

    if (!valid) {
      this.errors.push({ field: 'src', message: 'Invalid length' });
    }

    valid = valid && validator.isURL(this.src);

    if (!valid) {
      this.errors.push({ field: 'src', message: 'Invalid URL' });
    }

    return valid;
  }

  validTitle() {
    let valid = false;
    valid = validator.isLength(this.title, { min: 1, max: 255 });

    if (!valid) {
      this.errors.push({ field: 'title', message: 'Invalid length' });
    }

    return valid;
  }

  validationErrors() {
    return this.errors;
  }
}

export default Video;
