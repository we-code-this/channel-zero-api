import LabelQuery from "../models/LabelQuery";

const routes = fastify => {
  fastify.get("/labels/:limit/:order", async function(req, reply) {
    const labels = await new LabelQuery().get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(labels);
  });

  fastify.get("/labels/:limit", async function(req, reply) {
    const labels = await new LabelQuery().get({
      limit: req.params.limit
    });
    reply.send(labels);
  });

  fastify.get("/labels", async function(req, reply) {
    const labels = await new LabelQuery().get();
    reply.send(labels);
  });
};

export default routes;
