import FeatureQuery from "../models/FeatureQuery";

const routes = fastify => {
  fastify.get("/features/:limit/:order", async function(req, reply) {
    const features = await new FeatureQuery().get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(features);
  });

  fastify.get("/features/:limit", async function(req, reply) {
    const features = await new FeatureQuery().get({
      limit: req.params.limit
    });
    reply.send(features);
  });

  fastify.get("/features", async function(req, reply) {
    const features = await new FeatureQuery().get();
    reply.send(features);
  });

  fastify.get("/feature", async function(req, reply) {
    const feature = await new FeatureQuery().current();
    reply.send(feature);
  });
};

export default routes;
