import FeatureQuery from '../models/FeatureQuery';
import UserQuery from '../models/UserQuery';

export default {
  all: async (req, reply) => {
    const all = await new FeatureQuery().all();
    reply.send(all);
  },
  count: async (req, reply) => {
    const res = await new FeatureQuery().count();
    reply.send([{ count: parseInt(res.count) }]);
  },
  create: async (req, reply) => {
    const id = await new UserQuery().getIdByEmail(req.decoded.user);
    let feature;

    if (id) {
      feature = await new FeatureQuery().create({
        ...req.body,
        user_id: id,
      });
    }

    if (feature) {
      reply.send(feature);
    } else {
      reply.status(500).send();
    }
  },
  current: async (req, reply) => {
    const feature = await new FeatureQuery().current();
    reply.send(feature);
  },
  del: async (req, reply) => {
    const deleted = await new FeatureQuery().delete(req.body.id);

    if (deleted) {
      reply.send(deleted);
    } else {
      reply.status(404).send();
    }
  },
  get: async (req, reply) => {
    const features = await new FeatureQuery().get();
    reply.send(features);
  },
  getOneById: async (req, reply) => {
    const feature = await new FeatureQuery().findById(req.params.id);

    if (feature) {
      reply.send(feature);
    } else {
      reply.status(404).send();
    }
  },
  getRange: async (req, reply) => {
    const features = await new FeatureQuery().get(
      {
        offset: req.params.offset,
        limit: req.params.limit,
        order: req.params.order,
      },
      false,
    );
    reply.send(features);
  },
  getWithLimit: async (req, reply) => {
    const features = await new FeatureQuery().get({
      limit: req.params.limit,
    });
    reply.send(features);
  },
  getWithLimitAndOrder: async (req, reply) => {
    const features = await new FeatureQuery().get({
      limit: req.params.limit,
      order: req.params.order,
    });
    reply.send(features);
  },
  publish: async (req, reply) => {
    const publishedFeature = await new FeatureQuery().publish(
      req.body.id,
    );

    reply.send(publishedFeature);
  },
  unpublish: async (req, reply) => {
    const unpublishedFeature = await new FeatureQuery().unpublish(
      req.body.id,
    );

    reply.send(unpublishedFeature);
  },
  update: async (req, reply) => {
    const updatedFeature = await new FeatureQuery().update(req.body);
    reply.send(updatedFeature);
  },
};
