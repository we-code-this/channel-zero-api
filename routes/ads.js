import ads from '../controllers/ads';

const routes = fastify => {
  fastify.get('/a', ads.random);
};

export default routes;
