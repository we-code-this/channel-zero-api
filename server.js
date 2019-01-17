const fastify = require("fastify")();

fastify.get("/", async (request, reply) => {
  return { channel: "zero" };
});

const start = async () => {
  try {
    await fastify.listen(3001);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
