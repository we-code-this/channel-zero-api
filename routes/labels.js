import labels from '../controllers/labels';

const routes = fastify => {
  fastify.get('/labels/range/:offset/:limit/:order', labels.getRange);
  fastify.get('/labels/by/name', labels.getByName);
  fastify.get('/labels/:limit/:order', labels.getWithLimitAndOrder);
  fastify.get('/labels/count', labels.count);
  fastify.get('/labels/:limit', labels.getWithLimit);
  fastify.get('/labels', labels.get);
  fastify.get('/label/:slug', labels.getOneBySlug);
  fastify.patch('/label/:slug', labels.update);
  fastify.delete('/label', labels.del);
  fastify.post('/label', labels.create);
};

export default routes;
