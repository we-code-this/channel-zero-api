import users from '../controllers/users';
import { validate } from '../lib/tokens';
import { isAdmin } from '../lib/auth';

const routes = (fastify) => {
  fastify.post('/login', users.login);
  fastify.post('/register', users.register);

  fastify.post('/password/forgot', users.forgot);

  fastify.get(
    '/users',
    { beforeHandler: [validate, isAdmin] },
    users.get,
  );
  fastify.get(
    '/users/range/:offset/:limit/:order',
    { beforeHandler: [validate, isAdmin] },
    users.getRange,
  );
  fastify.get(
    '/users/:limit/:order',
    { beforeHandler: [validate, isAdmin] },
    users.getWithLimitAndOrder,
  );
  fastify.get(
    '/users/count',
    { beforeHandler: [validate, isAdmin] },
    users.count,
  );
  fastify.get(
    '/users/:limit',
    { beforeHandler: [validate, isAdmin] },
    users.getWithLimit,
  );

  fastify.get(
    '/user/:id',
    { beforeHandler: [validate, isAdmin] },
    users.getOneById,
  );

  fastify.patch(
    '/user',
    { beforeHandler: [validate, isAdmin] },
    users.update,
  );

  fastify.post(
    '/user',
    { beforeHandler: [validate, isAdmin] },
    users.create,
  );

  fastify.delete(
    '/user',
    { beforeHandler: [validate, isAdmin] },
    users.del,
  );
};

export default routes;
