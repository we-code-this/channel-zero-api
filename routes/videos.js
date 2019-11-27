import videos from '../controllers/videos';
import { validate } from '../lib/tokens';
import { isAdmin } from '../lib/auth';

const routes = fastify => {
  fastify.get('/videos/range/:offset/:limit/:order', videos.getRange);
  fastify.get('/videos/by/title', videos.getByTitle);
  fastify.get('/videos/:limit/:order', videos.getWithLimitAndOrder);
  fastify.get('/videos/count', videos.count);
  fastify.get('/videos/:limit', videos.getWithLimit);
  fastify.get('/videos', videos.get);
  fastify.get('/video/:id', videos.getOneById);

  fastify.patch(
    '/video',
    { beforeHandler: [validate, isAdmin] },
    videos.update,
  );

  fastify.delete(
    '/video',
    { beforeHandler: [validate, isAdmin] },
    videos.del,
  );
  fastify.post(
    '/video',
    { beforeHandler: [validate, isAdmin] },
    videos.create,
  );
};

export default routes;
