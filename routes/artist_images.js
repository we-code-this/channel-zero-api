import artistImages from '../controllers/artist_images';

const routes = fastify => {
  fastify.post('/artist/image', artistImages.create);
  fastify.patch('/artist/image', artistImages.update);
  fastify.delete('/artist/image', artistImages.del);
  fastify.get('/artist/image/:id', artistImages.get);
};

export default routes;
