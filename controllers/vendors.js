import VendorQuery from '../models/VendorQuery';
import UserQuery from '../models/UserQuery';

export default {
  count: async (req, reply) => {
    const res = await new VendorQuery().count();
    reply.send([{ count: parseInt(res.count) }]);
  },
  create: async (req, reply) => {
    const id = await new UserQuery().getIdByEmail(req.decoded.user);
    let vendor;

    if (id) {
      vendor = await new VendorQuery().create({
        ...req.body,
        user_id: id,
      });
    }

    if (vendor) {
      reply.send(vendor);
    } else {
      reply.status(500).send();
    }
  },
  del: async (req, reply) => {
    const deleted = await new VendorQuery().delete(req.body.id);

    if (deleted) {
      reply.send(deleted);
    } else {
      reply.status(404).send();
    }
  },
  get: async (req, reply) => {
    const vendors = await new VendorQuery().all();
    reply.send(vendors);
  },
  getByName: async (req, reply) => {
    const vendors = await new VendorQuery().getByName();
    reply.send(vendors);
  },
  getOneById: async (req, reply) => {
    const vendor = await new VendorQuery().findById(req.params.id);

    if (vendor) {
      reply.send(vendor);
    } else {
      reply.status(404).send();
    }
  },
  getRange: async (req, reply) => {
    const releases = await new VendorQuery().get({
      offset: req.params.offset,
      limit: req.params.limit,
      order: req.params.order,
    });
    reply.send(releases);
  },
  update: async (req, reply) => {
    const updatedVendor = await new VendorQuery().update(req.body);
    reply.send(updatedVendor);
  },
};
