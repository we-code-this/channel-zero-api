import vendors from '../controllers/vendors';
import { validate } from '../lib/tokens';
import { isAdmin } from '../lib/auth';

const routes = (fastify) => {
  fastify.get('/vendor/:id', vendors.getOneById);
  fastify.get(
    '/vendors/range/:offset/:limit/:order',
    vendors.getRange,
  );
  fastify.get('/vendors/by/name', vendors.getByName);
  fastify.get('/vendors/count', vendors.count);
  fastify.get('/vendors', vendors.get);

  fastify.patch(
    '/vendor',
    { beforeHandler: [validate, isAdmin] },
    vendors.update,
  );
  fastify.delete(
    '/vendor',
    { beforeHandler: [validate, isAdmin] },
    vendors.del,
  );
  fastify.post(
    '/vendor',
    { beforeHandler: [validate, isAdmin] },
    vendors.create,
  );
};

export default routes;
