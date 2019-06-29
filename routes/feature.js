import features from '../controllers/features';

const routes = fastify => {
  fastify.get('/features/:limit/:order', features.getWithLimitAndOrder);
  fastify.get('/features/:limit', features.getWithLimit);
  fastify.get('/features', features.get);
  fastify.get('/feature', features.current);
};

export default routes;
