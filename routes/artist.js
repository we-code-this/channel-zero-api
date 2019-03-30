import ArtistQuery from "../models/ArtistQuery";

const routes = fastify => {
  fastify.get("/artist/:slug", async function(req, reply) {
    const artist = await new ArtistQuery().findBySlug(req.params.slug);

    if (artist) {
      reply.send(artist);
    } else {
      reply.status(404).send();
    }
  });

  fastify.patch("/artist/:slug", async function(req, reply) {
    const updatedArtist = await new ArtistQuery().updateBySlug(
      req.params.slug,
      req.body
    );
    reply.send(updatedArtist);
  });

  fastify.delete("/artist", async function(req, reply) {
    const deleted = await new ArtistQuery().delete(req.body.id);

    if (deleted) {
      reply.send(deleted);
    } else {
      reply.status(404).send();
    }
  });

  fastify.post("/artist", async function(req, reply) {
    const artist = await new ArtistQuery().create(req.body);

    if (artist) {
      reply.send(artist);
    } else {
      reply.status(500).send();
    }
  });

  fastify.get("/artists/range/:offset/:limit/:order", async function(
    req,
    reply
  ) {
    const artists = await new ArtistQuery().get({
      offset: req.params.offset,
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(artists);
  });

  fastify.get("/artists/:limit/:order", async function(req, reply) {
    const artists = await new ArtistQuery().get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(artists);
  });

  fastify.get("/artists/count", async function(req, reply) {
    const count = await new ArtistQuery().count();
    reply.send(count);
  });

  fastify.get("/artists/:limit", async function(req, reply) {
    const artists = await new ArtistQuery().get({
      limit: req.params.limit
    });
    reply.send(artists);
  });

  fastify.get("/artists", async function(req, reply) {
    const artists = await new ArtistQuery().get();
    reply.send(artists);
  });
};

export default routes;
