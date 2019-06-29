import artists from '../controllers/artists';

const routes = fastify => {
  fastify.get('/artist/:slug', artists.getOneBySlug);
  fastify.post('/artist', artists.create);
  fastify.patch('/artist', artists.update);
  fastify.delete('/artist', artists.del);
  fastify.get('/artists/range/:offset/:limit/:order', artists.getRange);
  fastify.get('/artists/by/name', artists.getByName);
  fastify.get('/artists/:limit/:order', artists.getWithLimitAndOrder);
  fastify.get('/artists/count', artists.count);
  fastify.get('/artists/:limit', artists.getWithLimit);
  fastify.get('/artists', artists.get);
};

export default routes;
