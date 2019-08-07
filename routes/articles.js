import articles from '../controllers/articles';
import { validate } from '../lib/tokens';
import { isAdmin } from '../lib/auth';

const routes = fastify => {
  fastify.get('/articles/:limit/:order', articles.getWithLimitAndOrder);
  fastify.get('/articles/:limit', articles.getWithLimit);
  fastify.get('/articles', articles.get);
  fastify.get('/article/:slug', articles.getOneBySlug);

  fastify.post(
    '/article',
    { beforeHandler: [validate, isAdmin] },
    articles.create
  );

  fastify.patch(
    '/article',
    { beforeHandler: [validate, isAdmin] },
    articles.update
  );
};

export default routes;
