import LabelQuery from '../models/LabelQuery';
import UserQuery from '../models/UserQuery';

export default {
  count: async (req, reply) => {
    const res = await new LabelQuery().count();
    reply.send([{ count: parseInt(res.count) }]);
  },
  create: async (req, reply) => {
    const id = await new UserQuery().getIdByEmail(req.decoded.user);
    let label;

    if (id) {
      label = await new LabelQuery().create({
        ...req.body,
        user_id: id,
      });
    }

    if (label) {
      reply.send(label);
    } else {
      reply.status(500).send();
    }
  },
  del: async (req, reply) => {
    const deleted = await new LabelQuery().delete(req.body.id);

    if (deleted) {
      reply.send(deleted);
    } else {
      reply.status(404).send();
    }
  },
  get: async (req, reply) => {
    const labels = await new LabelQuery().get();
    reply.send(labels);
  },
  getByName: async (req, reply) => {
    const labels = await new LabelQuery().getByName();
    reply.send(labels);
  },
  getOneBySlug: async (req, reply) => {
    const label = await new LabelQuery().findBySlug(req.params.slug);

    if (label) {
      reply.send(label);
    } else {
      reply.status(404).send();
    }
  },
  getRange: async (req, reply) => {
    const labels = await new LabelQuery().get({
      offset: req.params.offset,
      limit: req.params.limit,
      order: req.params.order,
    });
    reply.send(labels);
  },
  getWithLimit: async (req, reply) => {
    const labels = await new LabelQuery().get({
      limit: req.params.limit,
    });
    reply.send(labels);
  },
  getWithLimitAndOrder: async (req, reply) => {
    const labels = await new LabelQuery().get({
      limit: req.params.limit,
      order: req.params.order,
    });
    reply.send(labels);
  },
  update: async (req, reply) => {
    const updatedLabel = await new LabelQuery().updateBySlug(
      req.params.slug,
      req.body,
    );
    reply.send(updatedLabel);
  },
};
