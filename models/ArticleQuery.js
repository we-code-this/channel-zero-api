import knex from '../lib/connection';
import Article from './Article';

class ArticleQuery {
  constructor() {
    this.tablename = 'articles';
    this.items = undefined;
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

  async get(params = {}) {
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
      .orderBy('created_at', order);

    this.items = results.map(function(record) {
      return new Article(record);
    });

    return this.items;
  }
}

export default ArticleQuery;
