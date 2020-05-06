import ads from '../controllers/ads';
import { validate } from '../lib/tokens';
import { isAdmin } from '../lib/auth';

const routes = (fastify) => {
  fastify.get('/banners/range/:offset/:limit/:order', ads.getRange);
  fastify.get('/banners/:limit/:order', ads.getWithLimitAndOrder);
  fastify.get('/banners/count', ads.count);
  fastify.get('/banners/:limit', ads.getWithLimit);
  fastify.get('/banners', ads.get);
  fastify.get('/banner/:id', ads.getOneById);
  fastify.get('/a', ads.random);

  fastify.post(
    '/banner',
    { beforeHandler: [validate, isAdmin] },
    ads.create,
  );

  fastify.patch(
    '/banner',
    { beforeHandler: [validate, isAdmin] },
    ads.update,
  );

  fastify.patch(
    '/banner/publish',
    { beforeHandler: [validate, isAdmin] },
    ads.publish,
  );

  fastify.patch(
    '/banner/unpublish',
    { beforeHandler: [validate, isAdmin] },
    ads.unpublish,
  );

  fastify.delete(
    '/banner',
    { beforeHandler: [validate, isAdmin] },
    ads.del,
  );
};

export default routes;
