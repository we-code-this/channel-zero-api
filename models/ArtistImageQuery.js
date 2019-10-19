import moment from 'moment';
import knex from '../lib/connection';

import ArtistImage from './ArtistImage';

class ArtistImageQuery {
  constructor() {
    this.tablename = 'artist_images';
    this.items = undefined;
  }

  async create(data) {
    const imageData = { ...data };
    const artistImage = new ArtistImage(imageData, true);
    const isValid = artistImage.valid();
    if (isValid && (await artistImage.saveFile())) {
      const id = await knex(this.tablename).insert(
        {
          artist_id: artistImage.artist_id,
          filename: artistImage.filename
        },
        ['id']
      );

      return (await knex(this.tablename)
        .where('id', id[0])
        .limit(1))[0];
    } else {
      return { errors: artistImage.validationErrors() };
    }
  }

  async update(data) {
    const imageData = { ...data };

    const artistImage = await this.findById(imageData.id);
    artistImage.setImage(imageData.image);
    const isValid = artistImage.valid();

    if (isValid && (await artistImage.saveFile())) {
      return (await knex(this.tablename)
        .where('id', imageData.id)
        .limit(1))[0];
    } else {
      return { errors: artistImage.validationErrors() };
    }
  }

  async delete(id) {
    const image = await this.findById(id);

    if (image && image.deleteFile()) {
      return await knex(this.tablename)
        .where('id', id)
        .del();
    } else {
      return false;
    }
  }

  async findById(id) {
    const result = await knex(this.tablename).where('id', id);

    if (result.length > 0) {
      return await new ArtistImage(result[0]);
    } else {
      return undefined;
    }
  }

  async findByArtist(id) {
    return (await knex(this.tablename).where('artist_id', id)).map(image => {
      return new ArtistImage(image);
    });
  }
}

export default ArtistImageQuery;
