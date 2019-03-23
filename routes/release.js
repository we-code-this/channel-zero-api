import ReleaseQuery from "../models/ReleaseQuery";

const routes = fastify => {
  fastify.get("/releases/:limit/:order", async function(req, reply) {
    const releases = await new ReleaseQuery().get({
      limit: req.params.limit,
      order: req.params.order
    });

    reply.send(releases);
  });

  fastify.get("/releases/:limit", async function(req, reply) {
    const releases = await new ReleaseQuery().get({
      limit: req.params.limit
    });
    reply.send(releases);
  });

  fastify.get("/releases", async function(req, reply) {
    const releases = await new ReleaseQuery().get();
    reply.send(releases);
  });

  fastify.get("/release/:slug", async function(req, reply) {
    const release = await new ReleaseQuery().findBySlug(req.params.slug);
    reply.send(release);
  });
};

export default routes;
