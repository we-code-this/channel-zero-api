import VendorQuery from "../models/VendorQuery";

const routes = fastify => {
  fastify.get("/vendors", async function(req, reply) {
    const vendors = await new VendorQuery().all();
    reply.send(vendors);
  });
};

export default routes;
