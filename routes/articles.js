import articles from '../controllers/articles';

const routes = fastify => {
  fastify.get('/articles/:limit/:order', articles.getWithLimitAndOrder);
  fastify.get('/articles/:limit', articles.getWithLimit);
  fastify.get('/articles', articles.get);
};

export default routes;
