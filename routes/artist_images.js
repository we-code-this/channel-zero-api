import artistImages from '../controllers/artist_images';
import { validate } from '../lib/tokens';
import { isAdmin } from '../lib/auth';

const routes = fastify => {
  fastify.post(
    '/artist/image',
    { beforeHandler: [validate, isAdmin] },
    artistImages.create
  );
  fastify.patch(
    '/artist/image',
    { beforeHandler: [validate, isAdmin] },
    artistImages.update
  );
  fastify.delete(
    '/artist/image',
    { beforeHandler: [validate, isAdmin] },
    artistImages.del
  );
  fastify.get('/artist/image/:id', artistImages.get);
};

export default routes;
