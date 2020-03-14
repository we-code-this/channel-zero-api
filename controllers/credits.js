import ReleaseCreditQuery from '../models/ReleaseCreditQuery';

export default {
  create: async (req, reply) => {
    const credit = await new ReleaseCreditQuery().create({
      ...req.body,
    });

    if (credit) {
      reply.send(credit);
    } else {
      reply.status(500).send();
    }
  },

  del: async (req, reply) => {
    const id = req.body.id;
    const deleted = await new ReleaseCreditQuery().delete(id);

    if (deleted) {
      reply.send(deleted);
    } else {
      reply.status(404).send();
    }
  },

  get: async (req, reply) => {
    const credits = await new ReleaseCreditQuery().get();
    reply.send(credits);
  },

  getByReleaseId: async (req, reply) => {
    const credits = await new ReleaseCreditQuery().getByReleaseId(
      req.params.release_id,
    );
    reply.send(credits);
  },

  getOneById: async (req, reply) => {
    const credit = await new ReleaseCreditQuery().findById(
      req.params.id,
    );

    if (credit) {
      reply.send(credit);
    } else {
      reply.status(404).send();
    }
  },

  getWithLimit: async (req, reply) => {
    const credits = await new ReleaseCreditQuery().get({
      limit: req.params.limit,
    });
    reply.send(credits);
  },

  getWithLimitAndOrder: async (req, reply) => {
    const credits = await new ReleaseCreditQuery().get({
      limit: req.params.limit,
      order: req.params.order,
    });

    reply.send(credits);
  },

  update: async (req, reply) => {
    const updatedCredit = await new ReleaseCreditQuery().update(
      req.body,
    );
    reply.send(updatedCredit);
  },
};
