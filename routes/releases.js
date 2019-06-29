import releases from '../controllers/releases';
import { validate } from '../lib/tokens';

const routes = fastify => {
  fastify.get('/releases/range/:offset/:limit/:order', releases.getRange);
  fastify.get(
    '/releases/unpublished/:offset/:limit/:order',
    releases.getUnpublished
  );
  fastify.get('/releases/:limit/:order', releases.getWithLimitAndOrder);
  fastify.get('/releases/count', releases.count);
  fastify.get('/releases/:limit', releases.getWithLimit);
  fastify.get('/releases', releases.get);
  fastify.get('/release/:slug', releases.getOneBySlug);

  fastify.post('/release', { beforeHandler: [validate] }, releases.create);
  fastify.patch('/release', { beforeHandler: [validate] }, releases.update);
  fastify.patch(
    '/release/publish',
    { beforeHandler: [validate] },
    releases.publish
  );
  fastify.patch(
    '/release/unpublish',
    { beforeHandler: [validate] },
    releases.unpublish
  );
  fastify.delete('/release', { beforeHandler: [validate] }, releases.del);
};

export default routes;
