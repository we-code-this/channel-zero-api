import Ad from '../models/Ad';

export default {
  random: async (req, reply) => {
    const ads = await new Ad().random();
    reply.send(ads);
  }
};
