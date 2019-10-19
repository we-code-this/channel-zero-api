import fileType from 'file-type';
import isSvg from 'is-svg';
import crypto from 'crypto';
import validator from 'validator';
import knex from '../lib/connection';
import Model from './Model';

import { sanitize } from '../lib/strings';
import {
  assetDirectories,
  saveFile,
  deleteFile,
  publicUrl
} from '../lib/files';

class Promo extends Model {
  constructor(data, create) {
    super(data, create);

    this.name = sanitize(this.name);

    this.published =
      this.published &&
      (this.published === 'true' ||
        this.published === true ||
        this.published === 1)
        ? true
        : false;

    this.extension = undefined;

    if (!this.create && this.filename) {
      this.url = publicUrl(`/promos/${this.filename}`);
    }
  }

  valid() {
    let valid = false;

    if (this.create || this.image) {
      valid = this.validImage();
      valid = valid && this.validName();
    } else {
      valid = this.validName();
    }

    valid = valid && this.validUrl();
    valid = valid && this.validLocation();

    return valid;
  }

  validImage() {
    let valid = false;
    let fileIsSVG = false;

    if (this.image) {
      fileIsSVG = isSvg(this.image.data);
    }

    if (fileIsSVG) {
      valid = true;

      this.extension = 'svg';

      if (this.create && valid) {
        this.generateFilename();
      }
    } else {
      this.errors.push({
        field: 'image',
        message: 'Invalid image file. Accepted: svg'
      });
    }

    return valid;
  }

  validLocation() {
    let valid = false;

    if (this.location.match(/horizontal|vertical/)) {
      valid = true;
    }

    if (!valid) {
      this.errors.push({ field: 'location', message: 'Invalid location' });
    }

    return valid;
  }

  validName() {
    let valid = validator.isLength(this.name, { min: 1, max: 255 });

    if (!valid) {
      this.errors.push({ field: 'name', message: 'Invalid length' });
    }

    return valid;
  }

  validUrl() {
    let valid = validator.isURL(this.url);

    if (!valid) {
      this.errors.push({ field: 'url', message: 'Invalid URL' });
    }

    return valid;
  }

  validationErrors() {
    return this.errors;
  }

  generateFilename() {
    if (this.create) {
      const generated = crypto.randomBytes(4).toString('hex');
      this.filename = `${generated}.${this.extension}`;
    }
  }

  saveFile() {
    if (this.image) {
      return saveFile(assetDirectories.promos, this.filename, this.image.data);
    }

    return true;
  }

  deleteFile() {
    return deleteFile(assetDirectories.promos, this.filename);
  }
}

export default Promo;
