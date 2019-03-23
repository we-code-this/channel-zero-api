import PromoQuery from "../models/PromoQuery";

const routes = fastify => {
  fastify.get("/promos/:location/:limit", async function(req, reply) {
    const promos = await new PromoQuery().get({
      location: req.params.location,
      limit: req.params.limit
    });
    reply.send(promos);
  });

  fastify.get("/promos/:location", async function(req, reply) {
    const promos = await new PromoQuery().get({
      location: req.params.location
    });
    reply.send(promos);
  });

  fastify.get("/promos", async function(req, reply) {
    const promos = await new PromoQuery().get();
    reply.send(promos);
  });
};

export default routes;
