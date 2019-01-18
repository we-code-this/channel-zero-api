const Fastify = require("fastify");
const Article = require("./models/Article");

function buildApp() {
  const logging = false;
  const fastify = Fastify({ logger: logging });

  fastify.get("/articles", async function(req, reply) {
    const articles = await Article.get();
    reply.send(articles);
  });

  fastify.get("/articles/:count", async function(req, reply) {
    const articles = await Article.get({ count: req.params.count });
    reply.send(articles);
  });

  return fastify;
}

module.exports = buildApp;
