import Fastify from "fastify";
import Article from "./models/Article";

function buildApp() {
  const logging = true;
  const fastify = Fastify({ logger: logging });

  fastify.get("/articles", async function(req, reply) {
    const articles = await Article.get();
    reply.send(articles);
  });

  fastify.get("/articles/:limit", async function(req, reply) {
    const articles = await Article.get({ limit: req.params.limit });
    reply.send(articles);
  });

  return fastify;
}

export default buildApp;
