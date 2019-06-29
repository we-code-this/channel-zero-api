import PromoQuery from '../models/PromoQuery';

export default {
  get: async (req, reply) => {
    const promos = await new PromoQuery().get();
    reply.send(promos);
  },
  getWithLocation: async (req, reply) => {
    const promos = await new PromoQuery().get({
      location: req.params.location
    });
    reply.send(promos);
  },
  getWithLocationAndLimit: async (req, reply) => {
    const promos = await new PromoQuery().get({
      location: req.params.location,
      limit: req.params.limit
    });
    reply.send(promos);
  }
};
