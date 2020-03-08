import validator from 'validator';
import knex from '../lib/connection';
import moment from 'moment';
import Model from './Model';
import ReleaseTrack from './ReleaseTrack';

import { sanitize } from '../lib/strings';

class ReleaseDisc extends Model {
  constructor(data, create) {
    super(data, create);

    this.name = sanitize(this.name);

    this.tracks = undefined;
  }

  valid() {
    let valid = false;
    valid = this.validName();

    return valid;
  }

  validName() {
    let valid = validator.isLength(this.name, { min: 1, max: 255 });

    if (!valid) {
      this.errors.push({ field: 'name', message: 'Invalid length' });
    }

    return valid;
  }

  validationErrors() {
    return this.errors;
  }

  async withRelated() {
    await this.withTracks();

    return this;
  }

  async withTracks() {
    const results = await knex
      .select('*')
      .from('release_tracks')
      .where('disc_id', this.id)
      .orderBy('number', 'ASC');

    this.tracks = results.map(function(record) {
      return new ReleaseTrack(record);
    });

    return this;
  }
}

export default ReleaseDisc;
