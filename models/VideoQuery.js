import moment from 'moment';
import knex from '../lib/connection';
import Video from './Video';

class VideoQuery {
  constructor() {
    this.tablename = 'videos';
    this.items = undefined;
  }

  async count() {
    return await knex.count('* as count').from(this.tablename);
  }

  async create(data) {
    const videoData = { ...data };
    const video = new Video(videoData, true);
    const isValid = video.valid();

    if (isValid) {
      const id = await knex(this.tablename).insert(
        {
          user_id: video.user_id,
          src: video.src
        },
        ['id']
      );

      return await this.findById(id[0]);
    } else {
      return { errors: video.validationErrors() };
    }
  }

  async delete(id) {
    return await knex(this.tablename)
      .where('id', id)
      .del();
  }

  async findById(id) {
    const result = await knex
      .select('*')
      .from(this.tablename)
      .where('id', id)
      .limit(1);

    if (result.length > 0) {
      return new Video(result[0]);
    } else {
      return undefined;
    }
  }

  async get(params = {}) {
    const offset = params.offset ? parseInt(params.offset) : 0;
    const limit = params.limit ? parseInt(params.limit) : 10;
    const order = params.order ? params.order.toUpperCase() : 'DESC';

    const results = await knex
      .select('*')
      .from(this.tablename)
      .limit(limit)
      .offset(offset)
      .orderBy('created_at', order);

    this.items = results.map(function(record) {
      return new Video(record);
    });

    return this.items;
  }

  async update(fieldData) {
    const { id, src } = fieldData;
    const oldVideo = await this.findById(id);
    const data = {
      ...oldVideo,
      src,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    const video = new Video(data);
    const isValid = video.valid();

    if (isValid) {
      await knex(this.tablename)
        .where('id', id)
        .update({
          src: video.src,
          updated_at: video.updated_at
        });

      return await this.findById(id);
    } else {
      return { errors: video.validationErrors() };
    }
  }
}

export default VideoQuery;