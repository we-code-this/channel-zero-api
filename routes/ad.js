import Ad from "../models/Ad";

const routes = fastify => {
  fastify.get("/a", async function(req, reply) {
    const ads = await new Ad().random();
    reply.send(ads);
  });
};

export default routes;
