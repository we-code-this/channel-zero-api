import ReleaseDiscQuery from '../models/ReleaseDiscQuery';

export default {
  count: async (req, reply) => {
    const res = await new ReleaseDiscQuery().count();
    reply.send([{ count: parseInt(res.count) }]);
  },
  create: async (req, reply) => {
    const disc = await new ReleaseDiscQuery().create({
      ...req.body,
    });

    if (disc) {
      reply.send(disc);
    } else {
      reply.status(500).send();
    }
  },
  del: async (req, reply) => {
    const deleted = await new ReleaseDiscQuery().delete(req.body.id);

    if (deleted) {
      reply.send(deleted);
    } else {
      reply.status(404).send();
    }
  },
  get: async (req, reply) => {
    const discs = await new ReleaseDiscQuery().get();
    reply.send(discs);
  },
  getByReleaseId: async (req, reply) => {
    const discs = await new ReleaseDiscQuery().getByReleaseId(
      req.params.release_id,
    );
    reply.send(discs);
  },
  getOneById: async (req, reply) => {
    const disc = await new ReleaseDiscQuery().findById(req.params.id);

    if (disc) {
      reply.send(disc);
    } else {
      reply.status(404).send();
    }
  },
  getWithLimit: async (req, reply) => {
    const discs = await new ReleaseDiscQuery().get({
      limit: req.params.limit,
    });
    reply.send(discs);
  },
  getWithLimitAndOrder: async (req, reply) => {
    const discs = await new ReleaseDiscQuery().get({
      limit: req.params.limit,
      order: req.params.order,
    });

    reply.send(discs);
  },
  releaseCount: async (req, reply) => {
    const res = await new ReleaseDiscQuery().releaseCount(
      req.params.release_id,
    );
    reply.send([{ count: parseInt(res.count) }]);
  },
  update: async (req, reply) => {
    const updatedDisc = await new ReleaseDiscQuery().update(
      req.params.id,
      req.body,
    );
    reply.send(updatedDisc);
  },
};
