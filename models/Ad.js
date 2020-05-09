import fileType from 'file-type';
import crypto from 'crypto';
import validator from 'validator';
import moment from 'moment';
import Model from './Model';

import {
  validExtension,
  validImageDimensions,
} from '../lib/validators';
import { sanitize } from '../lib/strings';

import {
  assetDirectories,
  saveFile,
  deleteFile,
  urls,
} from '../lib/files';

class Ad extends Model {
  constructor(data, create) {
    super(data, create);

    this.url = sanitize(this.url);
    this.alt = sanitize(this.alt);

    if (!this.create && this.desktop_filename) {
      this.desktop_url = urls('a', this.desktop_filename);
    }

    if (!this.create && this.mobile_filename) {
      this.mobile_url = urls('a', this.mobile_filename);
    }

    this.published =
      this.published &&
      (this.published === 'true' ||
        this.published === true ||
        this.published === 1)
        ? true
        : false;

    this.allowedExtensions = ['jpg', 'jpeg', 'png'];
    this.desktop_extension = undefined;
    this.mobile_extension = undefined;
  }

  valid() {
    let valid = false;

    valid = this.validUrl();
    valid = this.validAlt() && valid;

    if (this.create || this.desktop_image) {
      valid = this.validDesktopImage() && valid;
    }

    if (this.create || this.mobile_image) {
      valid = this.validMobileImage() && valid;
    }

    return valid;
  }

  validAlt() {
    let valid = validator.isLength(this.alt, { min: 1, max: 255 });

    if (!valid) {
      this.errors.push({ field: 'alt', message: 'Invalid length' });
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

  validDesktopExtension() {
    let valid = false;

    valid = validExtension(
      this.desktop_extension,
      this.allowedExtensions,
    );

    if (!valid) {
      this.errors.push({
        field: 'desktop_image',
        message: 'Invalid image file type. Accepted: jpg, jpeg, png',
      });
    }

    return valid;
  }

  validMobileExtension() {
    let valid = false;

    valid = validExtension(
      this.mobile_extension,
      this.allowedExtensions,
    );

    if (!valid) {
      this.errors.push({
        field: 'mobile_image',
        message: 'Invalid image file type. Accepted: jpg, jpeg, png',
      });
    }

    return valid;
  }

  validDesktopDimensions() {
    let valid = false;

    valid = validImageDimensions(this.desktop_image.data, 1456, 180);

    if (!valid) {
      this.errors.push({
        field: 'desktop_image',
        message: 'Invalid image dimensions. Accepted: 1456 x 180 px',
      });
    }

    return valid;
  }

  validMobileDimensions() {
    let valid = false;

    valid = validImageDimensions(this.mobile_image.data, 640, 200);

    if (!valid) {
      this.errors.push({
        field: 'mobile_image',
        message: 'Invalid image dimensions. Accepted: 640 x 200 px',
      });
    }

    return valid;
  }

  validDesktopImage() {
    let valid = false;
    let type;

    try {
      type = fileType(this.desktop_image.data);
    } catch (e) {
      this.errors.push({
        field: 'desktop_image',
        message: 'Invalid image file. Accepted: jpg, jpeg, png',
      });

      return false;
    }

    this.desktop_extension = type.ext;

    valid = this.validDesktopExtension();
    valid = valid && this.validDesktopDimensions();

    if (valid) {
      this.generateDesktopFilename();
    }

    return valid;
  }

  validMobileImage() {
    let valid = false;
    let type;

    try {
      type = fileType(this.mobile_image.data);
    } catch (e) {
      this.errors.push({
        field: 'mobile_image',
        message: 'Invalid image file. Accepted: jpg, jpeg, png',
      });

      return false;
    }

    this.mobile_extension = type.ext;

    valid = this.validMobileExtension();
    valid = valid && this.validMobileDimensions();

    if (valid) {
      this.generateMobileFilename();
    }

    return valid;
  }

  generateDesktopFilename() {
    if (!this.desktop_filename) {
      const generated = crypto.randomBytes(4).toString('hex');
      this.desktop_filename = `${generated}.${this.desktop_extension}`;
    }
  }

  generateMobileFilename() {
    if (!this.mobile_filename) {
      const generated = crypto.randomBytes(4).toString('hex');
      this.mobile_filename = `${generated}.${this.mobile_extension}`;
    }
  }

  saveDesktopFile() {
    if (this.desktop_image) {
      return saveFile(
        assetDirectories.a,
        this.desktop_filename,
        this.desktop_image.data,
      );
    }

    return true;
  }

  saveMobileFile() {
    if (this.mobile_image) {
      return saveFile(
        assetDirectories.a,
        this.mobile_filename,
        this.mobile_image.data,
      );
    }

    return true;
  }

  validationErrors() {
    console.log('errors:', this.errors);
    return this.errors;
  }

  deleteDesktopFile() {
    return deleteFile(assetDirectories.a, this.desktop_filename);
  }

  deleteMobileFile() {
    return deleteFile(assetDirectories.a, this.mobile_filename);
  }
}

export default Ad;
