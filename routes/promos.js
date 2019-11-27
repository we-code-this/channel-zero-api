import promos from '../controllers/promos';
import { validate } from '../lib/tokens';
import { isAdmin } from '../lib/auth';

const routes = fastify => {
  fastify.get(
    '/promos/placement/:location/:limit',
    promos.getWithLocationAndLimit,
  );
  fastify.get('/promos/placement/:location', promos.getWithLocation);
  fastify.get('/promos/range/:offset/:limit/:order', promos.getRange);
  fastify.get(
    '/promos/unpublished/:offset/:limit/:order',
    promos.getUnpublished,
  );
  fastify.get('/promos/:limit/:order', promos.getWithLimitAndOrder);
  fastify.get('/promos/count', promos.count);
  fastify.get('/promos/:limit', promos.getWithLimit);
  fastify.get('/promos', promos.get);
  fastify.get('/promo/:id', promos.getOneById);

  fastify.post(
    '/promo',
    { beforeHandler: [validate, isAdmin] },
    promos.create,
  );
  fastify.patch(
    '/promo',
    { beforeHandler: [validate, isAdmin] },
    promos.update,
  );
  fastify.patch(
    '/promo/publish',
    { beforeHandler: [validate, isAdmin] },
    promos.publish,
  );
  fastify.patch(
    '/promo/unpublish',
    { beforeHandler: [validate, isAdmin] },
    promos.unpublish,
  );
  fastify.delete(
    '/promo',
    { beforeHandler: [validate, isAdmin] },
    promos.del,
  );
};

export default routes;
