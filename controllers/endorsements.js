import EndorsementQuery from "../models/EndorsementQuery";
import UserQuery from "../models/UserQuery";

export default {
  count: async (req, reply) => {
    const res = await new EndorsementQuery().count();
    reply.send([{ count: parseInt(res.count) }]);
  },
  create: async (req, reply) => {
    const id = await new UserQuery().getIdByEmail(req.decoded.user);
    let endorsement;

    if (id) {
      endorsement = await new EndorsementQuery().create({
        ...req.body,
        user_id: id
      });
    }

    if (endorsement) {
      reply.send(endorsement);
    } else {
      reply.status(500).send();
    }
  },
  del: async (req, reply) => {
    const deleted = await new EndorsementQuery().delete(req.body.id);

    if (deleted) {
      reply.send(deleted);
    } else {
      reply.status(404).send();
    }
  },
  get: async (req, reply) => {
    const endorsements = await new EndorsementQuery().get();
    reply.send(endorsements);
  },
  getOneById: async (req, reply) => {
    const endorsement = await new EndorsementQuery().findById(req.params.id);

    if (endorsement) {
      reply.send(endorsement);
    } else {
      reply.status(404).send();
    }
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
  },
  update: async (req, reply) => {
    const updatedEndorsement = await new EndorsementQuery().update(req.body);
    reply.send(updatedEndorsement);
  }
};
