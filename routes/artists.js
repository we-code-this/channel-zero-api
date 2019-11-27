import artists from '../controllers/artists';
import { validate } from '../lib/tokens';
import { isAdmin } from '../lib/auth';

const routes = fastify => {
  fastify.get('/artist/:slug', artists.getOneBySlug);
  fastify.get(
    '/artists/range/:offset/:limit/:order',
    artists.getRange,
  );
  fastify.get('/artists/by/name', artists.getByName);
  fastify.get('/artists/:limit/:order', artists.getWithLimitAndOrder);
  fastify.get('/artists/count', artists.count);
  fastify.get('/artists/:limit', artists.getWithLimit);
  fastify.get('/artists', artists.get);

  fastify.post(
    '/artist',
    { beforeHandler: [validate, isAdmin] },
    artists.create,
  );
  fastify.patch(
    '/artist',
    { beforeHandler: [validate, isAdmin] },
    artists.update,
  );
  fastify.delete(
    '/artist',
    { beforeHandler: [validate, isAdmin] },
    artists.del,
  );
};

export default routes;
