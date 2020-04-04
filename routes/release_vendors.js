import release_vendors from '../controllers/release_vendors';
import { validate } from '../lib/tokens';
import { isAdmin } from '../lib/auth';

const routes = (fastify) => {
  fastify.get('/releasevendor/:id', release_vendors.getOneById);

  fastify.post(
    '/releasevendor',
    { beforeHandler: [validate, isAdmin] },
    release_vendors.create,
  );

  fastify.patch(
    '/releasevendor',
    { beforeHandler: [validate, isAdmin] },
    release_vendors.update,
  );

  fastify.delete(
    '/releasevendor',
    { beforeHandler: [validate, isAdmin] },
    release_vendors.del,
  );
};

export default routes;
