import ArtistQuery from '../models/ArtistQuery';

export default {
  count: async (req, reply) => {
    const count = await new ArtistQuery().count();
    reply.send(count);
  },
  get: async (req, reply) => {
    const artists = await new ArtistQuery().get();
    reply.send(artists);
  },
  getOneBySlug: async (req, reply) => {
    const artist = await new ArtistQuery().findBySlug(req.params.slug);

    if (artist) {
      reply.send(artist);
    } else {
      reply.status(404).send();
    }
  },
  getByName: async (req, reply) => {
    const artists = await new ArtistQuery().getByName();
    reply.send(artists);
  },
  getRange: async (req, reply) => {
    const artists = await new ArtistQuery().get({
      offset: req.params.offset,
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(artists);
  },
  getWithLimit: async (req, reply) => {
    const artists = await new ArtistQuery().get({
      limit: req.params.limit
    });
    reply.send(artists);
  },
  getWithLimitAndOrder: async (req, reply) => {
    const artists = await new ArtistQuery().get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(artists);
  },
  create: async (req, reply) => {
    const artist = await new ArtistQuery().create(req.body);

    if (artist) {
      reply.send(artist);
    } else {
      reply.status(500).send();
    }
  },
  update: async (req, reply) => {
    const updatedArtist = await new ArtistQuery().update(req.body);
    reply.send(updatedArtist);
  },
  del: async (req, reply) => {
    const response = await new ArtistQuery().delete(req.body.id);

    if (response === 1) {
      reply.send(1);
    } else if (response.error) {
      reply.send(response);
    } else {
      reply.status(404).send();
    }
  }
};
