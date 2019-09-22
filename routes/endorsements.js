import endorsements from '../controllers/endorsements';
import { validate } from '../lib/tokens';
import { isAdmin } from '../lib/auth';

const routes = fastify => {
  fastify.get(
    '/endorsements/type/:type/:offset/:limit/:order',
    endorsements.getTypeWithRange
  );
  fastify.get(
    '/endorsements/type/:type/:related_id',
    endorsements.getTypeWithRelatedId
  );
  fastify.get('/endorsements/type/:type', endorsements.getType);
  fastify.get(
    '/endorsements/range/:offset/:limit/:order',
    endorsements.getRange
  );
  fastify.get('/endorsements/:limit/:order', endorsements.getWithLimitAndOrder);
  fastify.get('/endorsements/count', endorsements.count);
  fastify.get('/endorsements/:limit', endorsements.getWithLimit);
  fastify.get('/endorsements', endorsements.get);
  fastify.get('/endorsement/:id', endorsements.getOneById);

  fastify.patch(
    '/endorsement',
    { beforeHandler: [validate, isAdmin] },
    endorsements.update
  );

  fastify.delete(
    '/endorsement',
    { beforeHandler: [validate, isAdmin] },
    endorsements.del
  );

  fastify.post(
    '/endorsement',
    { beforeHandler: [validate, isAdmin] },
    endorsements.create
  );
};

export default routes;
