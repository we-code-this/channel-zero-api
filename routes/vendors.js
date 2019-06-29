import vendors from '../controllers/vendors';

const routes = fastify => {
  fastify.get('/vendor/:id', vendors.getOneById);
  fastify.patch('/vendor', vendors.update);
  fastify.delete('/vendor', vendors.del);
  fastify.post('/vendor', vendors.create);
  fastify.get('/vendors/range/:offset/:limit/:order', vendors.getRange);
  fastify.get('/vendors', vendors.get);
  fastify.get('/vendors/count', vendors.count);
};

export default routes;
