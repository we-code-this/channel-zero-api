import fileType from 'file-type';
import crypto from 'crypto';
import {
  assetDirectories,
  saveFile,
  deleteFile,
  urls,
} from '../lib/files';
import Model from './Model';

class ArtistImage extends Model {
  constructor(data, create) {
    super(data, create);

    this.allowedExtensions = ['jpg', 'jpeg', 'png'];
    this.extension = undefined;

    if (!this.create && this.filename) {
      this.url = urls('artists', this.filename);
    }
  }

  setImage(image) {
    this.image = image;
  }

  valid() {
    let valid = false;

    valid = this.validImage();

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

    if (this.create && valid) {
      this.generateFilename();
    }

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
      return saveFile(
        assetDirectories.artists,
        this.filename,
        this.image.data,
      );
    }

    return true;
  }

  deleteFile() {
    return deleteFile(assetDirectories.artists, this.filename);
  }
}

export default ArtistImage;
