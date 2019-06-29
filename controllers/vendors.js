import VendorQuery from '../models/VendorQuery';

export default {
  count: async (req, reply) => {
    const count = await new VendorQuery().count();
    reply.send(count);
  },
  create: async (req, reply) => {
    const vendor = await new VendorQuery().create(req.body);

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
      order: req.params.order
    });
    reply.send(releases);
  },
  update: async (req, reply) => {
    const updatedVendor = await new VendorQuery().update(req.body);
    reply.send(updatedVendor);
  }
};
