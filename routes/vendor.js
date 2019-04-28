import VendorQuery from "../models/VendorQuery";

const routes = fastify => {
  fastify.get("/vendor/:id", async function(req, reply) {
    const vendor = await new VendorQuery().findById(req.params.id);

    if (vendor) {
      reply.send(vendor);
    } else {
      reply.status(404).send();
    }
  });

  fastify.post("/vendor", async function(req, reply) {
    const vendor = await new VendorQuery().create(req.body);

    if (vendor) {
      reply.send(vendor);
    } else {
      reply.status(500).send();
    }
  });

  fastify.get("/vendors/range/:offset/:limit/:order", async function(
    req,
    reply
  ) {
    const releases = await new VendorQuery().get({
      offset: req.params.offset,
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(releases);
  });

  fastify.get("/vendors", async function(req, reply) {
    const vendors = await new VendorQuery().all();
    reply.send(vendors);
  });

  fastify.get("/vendors/count", async function(req, reply) {
    const count = await new VendorQuery().count();
    reply.send(count);
  });
};

export default routes;
