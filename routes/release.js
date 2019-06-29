import releases from '../controllers/releases';

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
  fastify.post('/release', releases.create);
  fastify.patch('/release', releases.update);
  fastify.patch('/release/publish', releases.publish);
  fastify.patch('/release/unpublish', releases.unpublish);
  fastify.delete('/release', releases.del);
};

export default routes;
