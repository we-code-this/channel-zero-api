import credits from '../controllers/credits';
import { validate } from '../lib/tokens';
import { isAdmin } from '../lib/auth';

const routes = fastify => {
  fastify.get('/release/:release_id/credits', credits.getByReleaseId);
  fastify.get('/credits/:limit/:order', credits.getWithLimitAndOrder);
  fastify.get('/credits/:limit', credits.getWithLimit);
  fastify.get('/credits', credits.get);
  fastify.get('/credit/:id', credits.getOneById);

  fastify.post(
    '/credit',
    { beforeHandler: [validate, isAdmin] },
    credits.create,
  );

  fastify.patch(
    '/credit',
    { beforeHandler: [validate, isAdmin] },
    credits.update,
  );

  fastify.delete(
    '/credit',
    { beforeHandler: [validate, isAdmin] },
    credits.del,
  );
};

export default routes;
