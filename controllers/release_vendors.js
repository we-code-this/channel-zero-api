import ReleaseVendorQuery from '../models/ReleaseVendorQuery';

export default {
  create: async (req, reply) => {
    const vendor = await new ReleaseVendorQuery().create({
      ...req.body,
    });

    if (vendor) {
      reply.send(vendor);
    } else {
      reply.status(500).send();
    }
  },
  del: async (req, reply) => {
    const id = req.body.id;
    const deleted = await new ReleaseVendorQuery().delete(id);

    if (deleted) {
      reply.send(deleted);
    } else {
      reply.status(404).send();
    }
  },
  getOneById: async (req, reply) => {
    const vendor = await new ReleaseVendorQuery().findById(
      req.params.id,
    );

    if (vendor) {
      reply.send(vendor);
    } else {
      reply.status(404).send();
    }
  },
  update: async (req, reply) => {
    const updatedVendor = await new ReleaseVendorQuery().update(
      req.body,
    );
    reply.send(updatedVendor);
  },
};
