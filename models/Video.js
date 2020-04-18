import Model from './Model';
import validator from 'validator';
import urlParse from 'url-parse';
import { sanitize } from '../lib/strings';

class Video extends Model {
  constructor(data, create) {
    super(data, create);

    this.src = this.parseSrc(this.src);
    this.title = sanitize(this.title);
  }

  parseSrc() {
    this.src = sanitize(this.src);

    if (
      this.src.includes('youtube.com') &&
      !this.src.includes('embed')
    ) {
      this.src = this.parseYoutube();
    }

    if (
      this.src.includes('vimeo.com') &&
      !this.src.includes('player')
    ) {
      this.src = this.parseVimeo();
    }

    return this.src;
  }

  parseVimeo() {
    const url = urlParse(this.src, true);
    const identifier = url.pathname.slice(1);

    this.src = `https://player.vimeo.com/video/${identifier}`;

    return this.src;
  }

  parseYoutube() {
    const url = urlParse(this.src, true);

    this.src = `https://www.youtube.com/embed/${url.query.v}`;

    return this.src;
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
