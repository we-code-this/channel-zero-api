import ArticleQuery from '../models/ArticleQuery';

export default {
  get: async function(req, reply) {
    const articles = await new ArticleQuery().get();
    reply.send(articles);
  },
  getWithLimit: async (req, reply) => {
    const articles = await new ArticleQuery().get({
      limit: req.params.limit
    });
    reply.send(articles);
  },
  getWithLimitAndOrder: async (req, reply) => {
    const articles = await new ArticleQuery().get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(articles);
  }
};
