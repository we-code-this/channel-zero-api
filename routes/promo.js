import promos from '../controllers/promos';

const routes = fastify => {
  fastify.get('/promos/:location/:limit', promos.getWithLocationAndLimit);
  fastify.get('/promos/:location', promos.getWithLocation);
  fastify.get('/promos', promos.get);
};

export default routes;
