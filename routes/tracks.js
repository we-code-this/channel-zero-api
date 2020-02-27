import tracks from '../controllers/tracks';
import { validate } from '../lib/tokens';
import { isAdmin } from '../lib/auth';

const routes = fastify => {
  fastify.get('/disc/:disc_id/tracks/count', tracks.discCount);
  fastify.get(
    '/disc/:disc_id/track/:slug',
    tracks.getOneByDiscIdAndSlug,
  );
  fastify.get('/tracks/:limit/:order', tracks.getWithLimitAndOrder);
  fastify.get('/tracks/count', tracks.count);
  fastify.get('/tracks/:limit', tracks.getWithLimit);
  fastify.get('/tracks', tracks.get);

  fastify.patch(
    '/track/:id',
    { beforeHandler: [validate, isAdmin] },
    tracks.update,
  );

  fastify.delete(
    '/track',
    { beforeHandler: [validate, isAdmin] },
    tracks.del,
  );

  fastify.post(
    '/track',
    { beforeHandler: [validate, isAdmin] },
    tracks.create,
  );
};

export default routes;
