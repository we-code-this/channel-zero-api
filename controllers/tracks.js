import ReleaseTrackQuery from '../models/ReleaseTrackQuery';

export default {
  count: async (req, reply) => {
    const res = await new ReleaseTrackQuery().count();
    reply.send([{ count: parseInt(res.count) }]);
  },

  create: async (req, reply) => {
    const track = await new ReleaseTrackQuery().create({
      ...req.body,
    });

    if (track) {
      reply.send(track);
    } else {
      reply.status(500).send();
    }
  },

  del: async (req, reply) => {
    const deleted = await new ReleaseTrackQuery().delete(req.body.id);

    if (deleted) {
      reply.send(deleted);
    } else {
      reply.status(404).send();
    }
  },

  discCount: async (req, reply) => {
    const res = await new ReleaseTrackQuery().discCount(
      req.params.disc_id,
    );
    reply.send([{ count: parseInt(res.count) }]);
  },

  get: async (req, reply) => {
    const tracks = await new ReleaseTrackQuery().get();
    reply.send(tracks);
  },

  getOneByDiscIdAndSlug: async (req, reply) => {
    const track = await new ReleaseTrackQuery().findByDiscIdAndSlug(
      req.params.disc_id,
      req.params.slug,
    );

    if (track) {
      reply.send(track);
    } else {
      reply.status(404).send();
    }
  },

  getWithLimit: async (req, reply) => {
    const tracks = await new ReleaseTrackQuery().get({
      limit: req.params.limit,
    });
    reply.send(tracks);
  },

  getWithLimitAndOrder: async (req, reply) => {
    const tracks = await new ReleaseTrackQuery().get({
      limit: req.params.limit,
      order: req.params.order,
    });

    reply.send(tracks);
  },

  update: async (req, reply) => {
    const updatedTrack = await new ReleaseTrackQuery().update(
      req.params.id,
      req.body,
    );
    reply.send(updatedTrack);
  },
};
