import moment from 'moment';
import knex from '../lib/connection';
import Article from './Article';

class ArticleQuery {
  constructor() {
    this.tablename = 'articles';
    this.items = undefined;
  }

  async count() {
    return await knex.count('* as count').from(this.tablename);
  }

  async create(data) {
    const articleData = { ...data };
    const article = new Article(articleData, true);
    const isValid = article.valid();

    await article.generateSlug();

    if (isValid && article.saveFile()) {
      const id = await knex(this.tablename).insert(
        {
          user_id: article.user_id,
          title: article.title,
          slug: article.slug,
          summary: article.summary,
          description: article.description,
          filename: article.filename,
          published: article.published
        },
        ['id']
      );

      const res = (await knex
        .select('*')
        .from(this.tablename)
        .where(`${this.tablename}.id`, id[0])
        .limit(1))[0];

      return new Article(res);
    } else {
      return { errors: article.validationErrors() };
    }
  }

  async delete(id) {
    const article = await this.find(id);

    if (article && article.deleteFile()) {
      return await knex(this.tablename)
        .where('id', id)
        .del();
    } else {
      return false;
    }
  }

  async find(id) {
    const res = await knex
      .select('*')
      .from(this.tablename)
      .where(`${this.tablename}.id`, id);

    if (res.length > 0) {
      return new Article(res[0]);
    } else {
      return undefined;
    }
  }

  async findBySlug(slug) {
    const res = await knex
      .select('*')
      .from(this.tablename)
      .where(`${this.tablename}.slug`, slug);

    if (res.length > 0) {
      return new Article(res[0]);
    } else {
      return undefined;
    }
  }

  async get(params = {}) {
    const offset = params.offset ? parseInt(params.offset) : 0;
    const limit = params.limit ? parseInt(params.limit) : 10;
    const order = params.order ? params.order.toUpperCase() : 'DESC';

    if (this.items) {
      return items;
    }

    const results = await knex
      .select('*')
      .from(this.tablename)
      .where('published', true)
      .limit(limit)
      .offset(offset)
      .orderBy('created_at', order);

    this.items = results.map(function(record) {
      return new Article(record);
    });

    return this.items;
  }

  async publish(id) {
    const response = await knex(this.tablename)
      .where('id', id)
      .update({ published: 1 });

    return response === 1 ? await this.find(id) : undefined;
  }

  async unpublish(id) {
    const response = await knex(this.tablename)
      .where('id', id)
      .update({ published: 0 });

    return response === 1 ? await this.find(id) : undefined;
  }

  async update(updatedFields) {
    const { id, ...remainingUpdatedFields } = updatedFields;
    const oldArticle = await this.find(id);

    const data = {
      ...oldArticle,
      ...remainingUpdatedFields,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    const article = new Article(data);
    const isValid = article.valid();

    if (isValid && article.saveFile()) {
      await knex(this.tablename)
        .where('id', id)
        .update({
          title: article.title,
          summary: article.summary,
          description: article.description,
          updated_at: article.updated_at
        });

      return await this.find(id);
    } else {
      return { errors: article.validationErrors() };
    }
  }
}

export default ArticleQuery;
