import LabelQuery from "../models/LabelQuery";

const routes = fastify => {
  fastify.get("/labels/range/:offset/:limit/:order", async function(
    req,
    reply
  ) {
    const labels = await new LabelQuery().get({
      offset: req.params.offset,
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(labels);
  });

  fastify.get("/labels/:limit/:order", async function(req, reply) {
    const labels = await new LabelQuery().get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(labels);
  });

  fastify.get("/labels/count", async function(req, reply) {
    const count = await new LabelQuery().count();
    reply.send(count);
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

  fastify.post("/label", async function(req, reply) {
    const label = await new LabelQuery().create(req.body);

    if (label) {
      reply.send(label);
    } else {
      reply.status(500).send();
    }
  });
};

export default routes;
