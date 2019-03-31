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

  fastify.get("/label/:slug", async function(req, reply) {
    const label = await new LabelQuery().findBySlug(req.params.slug);

    if (label) {
      reply.send(label);
    } else {
      reply.status(404).send();
    }
  });

  fastify.patch("/label/:slug", async function(req, reply) {
    const updatedLabel = await new LabelQuery().updateBySlug(
      req.params.slug,
      req.body
    );
    reply.send(updatedLabel);
  });

  fastify.delete("/label", async function(req, reply) {
    const deleted = await new LabelQuery().delete(req.body.id);

    if (deleted) {
      reply.send(deleted);
    } else {
      reply.status(404).send();
    }
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
