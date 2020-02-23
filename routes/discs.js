import discs from '../controllers/discs';
import { validate } from '../lib/tokens';
import { isAdmin } from '../lib/auth';

const routes = fastify => {
  fastify.get('/release/:release_id/discs/count', discs.releaseCount);
  fastify.get('/release/:release_id/discs', discs.getByReleaseId);
  fastify.get('/discs/:limit/:order', discs.getWithLimitAndOrder);
  fastify.get('/discs/count', discs.count);
  fastify.get('/discs/:limit', discs.getWithLimit);
  fastify.get('/discs', discs.get);
  fastify.get('/disc/:id', discs.getOneById);

  fastify.patch(
    '/disc/:id',
    { beforeHandler: [validate, isAdmin] },
    discs.update,
  );

  fastify.delete(
    '/disc',
    { beforeHandler: [validate, isAdmin] },
    discs.del,
  );

  fastify.post(
    '/disc',
    { beforeHandler: [validate, isAdmin] },
    discs.create,
  );
};

export default routes;
