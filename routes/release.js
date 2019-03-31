import ReleaseQuery from "../models/ReleaseQuery";

const routes = fastify => {
  fastify.get("/releases/range/:offset/:limit/:order", async function(
    req,
    reply
  ) {
    const releases = await new ReleaseQuery().get({
      offset: req.params.offset,
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(releases);
  });

  fastify.get("/releases/:limit/:order", async function(req, reply) {
    const releases = await new ReleaseQuery().get({
      limit: req.params.limit,
      order: req.params.order
    });

    reply.send(releases);
  });

  fastify.get("/releases/count", async function(req, reply) {
    const count = await new ReleaseQuery().count();
    reply.send(count);
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

    if (release) {
      reply.send(release);
    } else {
      reply.status(404).send();
    }
  });

  fastify.post("/release", async function(req, reply) {
    const files = await req.raw.files;
    let image;

    if (files) {
      image = files.image;
    }

    const release = await new ReleaseQuery().create({
      ...req.raw.body,
      image: image
    });

    if (release) {
      reply.send(release);
    } else {
      reply.status(500).send();
    }
  });
};

export default routes;
