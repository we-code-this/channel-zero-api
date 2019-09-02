import knex from '../lib/connection';
import Feature from './Feature';
import moment from 'moment';

class FeatureQuery {
  constructor() {
    this.tablename = 'features';
    this.items = undefined;
  }

  select() {
    return knex
      .select(
        `${this.tablename}.*`,
        'articles.title as article_title',
        'articles.summary as article_summary',
        'articles.published as article_published',
        'articles.created_at as article_created_at',
        'articles.updated_at as article_updated_at',
        'videos.src as video_src',
        'videos.created_at as video_created_at',
        'videos.updated_at as video_updated_at'
      )
      .from(this.tablename)
      .leftJoin('articles', `${this.tablename}.article_id`, 'articles.id')
      .leftJoin('videos', `${this.tablename}.video_id`, 'videos.id');
  }

  async query(params = {}) {
    if (this.items) {
      return items;
    }

    const offset = params.offset ? parseInt(params.offset) : 0;
    const limit = params.limit ? parseInt(params.limit) : 10;
    const order = params.order ? params.order.toUpperCase() : 'DESC';

    const results = await this.select()
      .where(`${this.tablename}.published`, true)
      .limit(limit)
      .offset(offset)
      .orderBy('created_at', order);

    this.items = results.map(function(record) {
      return new Feature(record);
    });

    return this.items;
  }

  async count() {
    return await knex.count('* as count').from(this.tablename);
  }

  async create(data) {
    const featureData = { ...data };
    const feature = new Feature(featureData, true);
    const isValid = feature.valid();

    if (isValid) {
      const id = await knex(this.tablename).insert(
        {
          user_id: feature.user_id,
          article_id: feature.article_id,
          video_id: feature.video_id
        },
        ['id']
      );

      return await this.findById(id[0]);
    } else {
      return { errors: feature.validationErrors() };
    }
  }

  async delete(id) {
    return await knex(this.tablename)
      .where('id', id)
      .del();
  }

  async findById(id) {
    const result = await this.select()
      .where(`${this.tablename}.id`, id)
      .limit(1);

    if (result.length > 0) {
      return new Feature(result[0]);
    } else {
      return undefined;
    }
  }

  async get(params) {
    return await this.query(params);
  }

  async current() {
    return (await this.query({ limit: 1 }))[0];
  }

  async update(fieldData) {
    const { id, article_id, video_id } = fieldData;
    const oldFeature = await this.findById(id);
    const data = {
      ...oldFeature,
      article_id,
      video_id,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    const feature = new Feature(data);
    const isValid = feature.valid();

    if (isValid) {
      await knex(this.tablename)
        .where('id', id)
        .update({
          article_id: feature.article_id,
          video_id: feature.video_id,
          updated_at: feature.updated_at
        });

      return await this.findById(id);
    } else {
      return { errors: feature.validationErrors() };
    }
  }
}

export default FeatureQuery;
