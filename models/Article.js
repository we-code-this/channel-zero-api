import fileType from 'file-type';
import crypto from 'crypto';
import validator from 'validator';
import Model from './Model';

import { sanitize, slugify } from '../lib/strings';
import {
  assetDirectories,
  saveFile,
  deleteFile,
  urls,
} from '../lib/files';

class Article extends Model {
  constructor(data, create) {
    super(data, create);

    this.title = sanitize(this.title);
    this.summary = sanitize(this.summary);
    this.description = sanitize(this.description);

    if (!this.create && this.filename) {
      this.url = urls('articles', this.filename);
    }

    this.published =
      this.published &&
      (this.published === 'true' ||
        this.published === true ||
        this.published === 1)
        ? true
        : false;

    this.allowedExtensions = ['jpg', 'jpeg', 'png'];
    this.extension = undefined;
  }

  async generateSlug() {
    if (this.create) {
      this.slug = await slugify(this.title, 'articles', 'slug');
    }
  }

  valid() {
    let valid = false;

    if (this.image) {
      valid = this.validImage();
      valid = valid && this.validTitle();
    } else {
      valid = this.validTitle();
    }

    valid = valid && this.validDescription();

    return valid;
  }

  validExtension() {
    let valid = false;

    this.allowedExtensions.map(extension => {
      if (extension === this.extension) {
        valid = true;
      }
    });

    if (!valid) {
      this.errors.push({
        field: 'image',
        message: 'Invalid image file type. Accepted: jpg, jpeg, png',
      });
    }

    return valid;
  }

  validImage() {
    let valid = false;
    let type;

    try {
      type = fileType(this.image.data);
    } catch (e) {
      this.errors.push({
        field: 'image',
        message: 'Invalid image file. Accepted: jpg, jpeg, png',
      });

      return false;
    }

    this.extension = type.ext;

    valid = this.validExtension();

    if (valid) {
      this.generateFilename();
    }

    return valid;
  }

  validDescription() {
    let valid = validator.isLength(this.description, { min: 1 });

    if (!valid) {
      this.errors.push({
        field: 'description',
        message: 'Description required',
      });
    }

    return valid;
  }

  validTitle() {
    let valid = validator.isLength(this.title, { min: 1, max: 255 });

    if (!valid) {
      this.errors.push({ field: 'title', message: 'Invalid length' });
    }

    return valid;
  }

  validationErrors() {
    return this.errors;
  }

  generateFilename() {
    if (!this.filename) {
      const generated = crypto.randomBytes(4).toString('hex');
      this.filename = `${generated}.${this.extension}`;
    }
  }

  saveFile() {
    if (this.image) {
      return saveFile(
        assetDirectories.articles,
        this.filename,
        this.image.data,
      );
    }

    return true;
  }

  deleteFile() {
    return deleteFile(assetDirectories.articles, this.filename);
  }
}

export default Article;
