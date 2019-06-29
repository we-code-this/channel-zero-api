import artistImages from '../controllers/artist_images';
import { validate } from '../lib/tokens';

const routes = fastify => {
  fastify.post(
    '/artist/image',
    { beforeHandler: [validate] },
    artistImages.create
  );
  fastify.patch(
    '/artist/image',
    { beforeHandler: [validate] },
    artistImages.update
  );
  fastify.delete(
    '/artist/image',
    { beforeHandler: [validate] },
    artistImages.del
  );
  fastify.get('/artist/image/:id', artistImages.get);
};

export default routes;
