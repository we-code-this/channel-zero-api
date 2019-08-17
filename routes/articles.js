import articles from '../controllers/articles';
import { validate } from '../lib/tokens';
import { isAdmin } from '../lib/auth';

const routes = fastify => {
  fastify.get('/articles/range/:offset/:limit/:order', articles.getRange);
  fastify.get(
    '/articles/unpublished/:offset/:limit/:order',
    articles.getUnpublished
  );
  fastify.get('/articles/:limit/:order', articles.getWithLimitAndOrder);
  fastify.get('/articles/count', articles.count);
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
  fastify.patch(
    '/article/publish',
    { beforeHandler: [validate, isAdmin] },
    articles.publish
  );
  fastify.patch(
    '/article/unpublish',
    { beforeHandler: [validate, isAdmin] },
    articles.unpublish
  );

  fastify.delete(
    '/article',
    { beforeHandler: [validate, isAdmin] },
    articles.del
  );
};

export default routes;
