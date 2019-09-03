import EndorsementQuery from '../models/EndorsementQuery';
import UserQuery from '../models/UserQuery';

export default {
  count: async (req, reply) => {
    const count = await new EndorsementQuery().count();
    reply.send(count);
  },
  get: async (req, reply) => {
    const endorsements = await new EndorsementQuery().get();
    reply.send(endorsements);
  },
  getRange: async (req, reply) => {
    const endorsements = await new EndorsementQuery().get({
      offset: req.params.offset,
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(endorsements);
  },
  getType: async (req, reply) => {
    const endorsements = await new EndorsementQuery().get({
      type: req.params.type
    });
    reply.send(endorsements);
  },
  getTypeWithRange: async (req, reply) => {
    const endorsements = await new EndorsementQuery().get({
      type: req.params.type,
      offset: req.params.offset,
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(endorsements);
  },
  getTypeWithRelatedId: async (req, reply) => {
    const endorsements = await new EndorsementQuery().get({
      type: req.params.type,
      related_id: req.params.related_id
    });
    reply.send(endorsements);
  },
  getWithLimit: async (req, reply) => {
    const endorsements = await new EndorsementQuery().get({
      limit: req.params.limit
    });
    reply.send(endorsements);
  },
  getWithLimitAndOrder: async (req, reply) => {
    const endorsements = await new EndorsementQuery().get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(endorsements);
  }
};
