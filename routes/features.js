import features from '../controllers/features';
import { validate } from '../lib/tokens';
import { isAdmin } from '../lib/auth';

const routes = (fastify) => {
  fastify.get(
    '/features/range/:offset/:limit/:order',
    features.getRange,
  );
  fastify.get(
    '/features/:limit/:order',
    features.getWithLimitAndOrder,
  );
  fastify.get('/features/all', features.all);
  fastify.get('/features/count', features.count);
  fastify.get('/features/:limit', features.getWithLimit);
  fastify.get('/features', features.get);
  fastify.get('/feature/:id', features.getOneById);
  fastify.get('/feature', features.current);

  fastify.patch(
    '/feature',
    { beforeHandler: [validate, isAdmin] },
    features.update,
  );

  fastify.patch(
    '/feature/publish',
    { beforeHandler: [validate, isAdmin] },
    features.publish,
  );

  fastify.patch(
    '/feature/unpublish',
    { beforeHandler: [validate, isAdmin] },
    features.unpublish,
  );

  fastify.delete(
    '/feature',
    { beforeHandler: [validate, isAdmin] },
    features.del,
  );
  fastify.post(
    '/feature',
    { beforeHandler: [validate, isAdmin] },
    features.create,
  );
};

export default routes;
