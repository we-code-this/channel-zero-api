import Model from './Model';
import validator from 'validator';
import { sanitize } from '../lib/strings';

class Endorsement extends Model {
  constructor(data, create) {
    super(data, create);

    this.review = sanitize(this.review);
    this.reviewer = sanitize(this.reviewer);
    this.type = sanitize(this.type);
  }

  valid() {
    let valid = false;

    valid = this.validReview();
    valid = valid && this.validReviewer();
    valid = valid && this.validRelatedId();

    if (this.url && this.url !== '') {
      valid = valid && this.validUrl();
    }

    valid = valid && this.validType();

    return valid;
  }

  validRelatedId() {
    let valid = false;
    valid = validator.isInt(this.related_id.toString());

    if (!valid) {
      this.errors.push({
        field: 'related_id',
        message: 'Invalid data',
      });
    }

    return valid;
  }

  validReview() {
    let valid = false;
    valid = validator.isLength(this.review, { min: 1 });

    if (!valid) {
      this.errors.push({
        field: 'review',
        message: 'Review is required',
      });
    }

    return valid;
  }

  validReviewer() {
    let valid = false;
    valid = validator.isLength(this.reviewer, { min: 1, max: 255 });

    if (!valid) {
      this.errors.push({
        field: 'reviewer',
        message: 'Invalid length',
      });
    }

    return valid;
  }

  validType() {
    let valid = false;
    valid = this.type === 'release';

    if (!valid) {
      this.errors.push({ field: 'type', message: 'Invalid type' });
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

export default Endorsement;
