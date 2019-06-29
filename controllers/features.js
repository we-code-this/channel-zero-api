import FeatureQuery from '../models/FeatureQuery';

export default {
  current: async (req, reply) => {
    const feature = await new FeatureQuery().current();
    reply.send(feature);
  },
  get: async (req, reply) => {
    const features = await new FeatureQuery().get();
    reply.send(features);
  },
  getWithLimit: async (req, reply) => {
    const features = await new FeatureQuery().get({
      limit: req.params.limit
    });
    reply.send(features);
  },
  getWithLimitAndOrder: async (req, reply) => {
    const features = await new FeatureQuery().get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(features);
  }
};
