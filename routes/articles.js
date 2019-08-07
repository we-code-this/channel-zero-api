import articles from '../controllers/articles';
import { validate } from '../lib/tokens';
import { isAdmin } from '../lib/auth';

const routes = fastify => {
  fastify.get('/articles/:limit/:order', articles.getWithLimitAndOrder);
  fastify.get('/articles/:limit', articles.getWithLimit);
  fastify.get('/articles', articles.get);

  fastify.post(
    '/article',
    { beforeHandler: [validate, isAdmin] },
    articles.create
  );
};

export default routes;
