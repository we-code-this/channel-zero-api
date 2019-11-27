import releases from '../controllers/releases';
import { validate } from '../lib/tokens';
import { isAdmin } from '../lib/auth';

const routes = fastify => {
  fastify.get(
    '/releases/range/:offset/:limit/:order',
    releases.getRange,
  );
  fastify.get(
    '/releases/unpublished/:offset/:limit/:order',
    releases.getUnpublished,
  );
  fastify.get(
    '/releases/:limit/:order',
    releases.getWithLimitAndOrder,
  );
  fastify.get('/releases/count', releases.count);
  fastify.get('/releases/:limit', releases.getWithLimit);
  fastify.get('/releases', releases.get);
  fastify.get('/release/:slug', releases.getOneBySlug);

  fastify.post(
    '/release',
    { beforeHandler: [validate, isAdmin] },
    releases.create,
  );
  fastify.patch(
    '/release',
    { beforeHandler: [validate, isAdmin] },
    releases.update,
  );
  fastify.patch(
    '/release/publish',
    { beforeHandler: [validate, isAdmin] },
    releases.publish,
  );
  fastify.patch(
    '/release/unpublish',
    { beforeHandler: [validate, isAdmin] },
    releases.unpublish,
  );
  fastify.delete(
    '/release',
    { beforeHandler: [validate, isAdmin] },
    releases.del,
  );
};

export default routes;
