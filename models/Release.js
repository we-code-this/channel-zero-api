import fileType from 'file-type';
import crypto from 'crypto';
import validator from 'validator';
import knex from '../lib/connection';
import moment from 'moment';
import Artist from './Artist';
import Endorsement from './Endorsement';
import Label from './Label';
import Model from './Model';
import Vendor from './Vendor';
import ReleaseCredit from './ReleaseCredit';
import ReleaseDisc from './ReleaseDisc';

import { sanitize, slugify } from '../lib/strings';
import {
  assetDirectories,
  saveFile,
  deleteFile,
  urls,
} from '../lib/files';
import ArtistQuery from './ArtistQuery';

class Release extends Model {
  constructor(data, create) {
    super(data, create);

    this.title = sanitize(this.title);
    this.description = sanitize(this.description, true);
    this.catalog_number = sanitize(this.catalog_number);
    this.release_type = sanitize(this.release_type);

    if (typeof this.release_date === 'string') {
      this.release_date = sanitize(this.release_date);
    } else {
      this.release_date = moment(this.release_date).format(
        'YYYY-MM-DD',
      );
    }

    this.published =
      this.published &&
      (this.published === 'true' ||
        this.published === true ||
        this.published === 1)
        ? true
        : false;

    if (this.create) {
      this.artist = undefined;
    } else {
      if (this.filename) {
        this.url = urls('releases', this.filename);
      }

      this.artist = new Artist({
        id: data.artist_id,
        name: data.artist_name,
        slug: data.artist_slug,
        description: data.artist_description,
        created_at: data.created_at,
        updated_at: data.updated_at,
      });

      this.label = new Label({
        id: data.label_id,
        name: data.label_name,
        slug: data.label_slug,
        created_at: data.label_created_at,
        updated_at: data.label_updated_at,
      });
    }

    this.allowedExtensions = ['jpg', 'jpeg', 'png'];

    this.credits = undefined;
    this.discs = undefined;
    this.endorsements = undefined;
    this.extension = undefined;
    this.vendors = undefined;
  }

  async withRelated() {
    await this.withVendors();
    await this.withCredits();
    await this.withEndorsements();
    await this.withDiscs();

    return this;
  }

  async withVendors() {
    const results = await knex
      .select(
        `release_vendors.id`,
        `release_vendors.url`,
        'vendors.name as name',
        'vendors.icon_class as icon_class',
      )
      .from('release_vendors')
      .leftJoin('vendors', `release_vendors.vendor_id`, 'vendors.id')
      .where('release_vendors.release_id', this.id)
      .orderBy('vendors.name', 'ASC');

    this.vendors = results.map(function(record) {
      return new Vendor(record);
    });

    return this;
  }

  async withCredits() {
    const results = await knex
      .select('*')
      .from('release_credits')
      .where('release_credits.release_id', this.id)
      .orderBy('release_credits.id', 'ASC');

    this.credits = results.map(function(record) {
      return new ReleaseCredit(record);
    });

    return this;
  }

  async withEndorsements() {
    const results = await knex
      .select('*')
      .from('endorsements')
      .where('related_id', this.id)
      .where('type', 'release')
      .orderBy('id', 'ASC');

    this.endorsements = results.map(function(record) {
      return new Endorsement(record);
    });

    return this;
  }

  async withDiscs() {
    const results = await knex
      .select('*')
      .from('release_discs')
      .where('release_id', this.id)
      .orderBy('sort', 'ASC');

    this.discs = await Promise.all(
      results.map(async function(record) {
        const disc = new ReleaseDisc(record);
        return await disc.withRelated();
      }),
    );

    return this;
  }

  valid() {
    let valid = false;

    if (this.create || this.image) {
      valid = this.validImage();
      valid =
        valid &&
        this.validTitle() &&
        this.validCatalogNumber() &&
        this.validReleaseDate() &&
        this.validReleaseType();
    } else {
      valid =
        this.validTitle() &&
        this.validCatalogNumber() &&
        this.validReleaseDate() &&
        this.validReleaseType();
    }

    return valid;
  }

  validCatalogNumber() {
    let valid = validator.isLength(this.catalog_number, {
      min: 1,
      max: 255,
    });

    if (!valid) {
      this.errors.push({
        field: 'catalog_number',
        message: 'Invalid length',
      });
    }

    return valid;
  }

  validReleaseDate() {
    let valid = validator.matches(
      this.release_date,
      /\d{4}-\d{2}-\d{2}/i,
    );

    if (!valid) {
      this.errors.push({
        field: 'release_date',
        message: 'Invalid release date',
      });
    }

    return valid;
  }

  validReleaseType() {
    let valid = validator.isLength(this.release_type, {
      min: 1,
      max: 255,
    });

    if (!valid) {
      this.errors.push({
        field: 'release_type',
        message: 'Invalid length',
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

  async generateSlug() {
    if (this.create) {
      this.artist = await new ArtistQuery().findById(this.artist_id);
      this.slug = await slugify(
        `${this.artist.name} ${this.title}`,
        'releases',
        'slug',
      );
    }
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
        assetDirectories.releases,
        this.filename,
        this.image.data,
      );
    }

    return true;
  }

  deleteFile() {
    return deleteFile(assetDirectories.releases, this.filename);
  }
}

export default Release;
