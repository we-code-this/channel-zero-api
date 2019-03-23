import ArticleQuery from "../models/ArticleQuery";

const routes = fastify => {
  fastify.get("/articles/:limit/:order", async function(req, reply) {
    const articles = await new ArticleQuery().get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(articles);
  });

  fastify.get("/articles/:limit", async function(req, reply) {
    const articles = await new ArticleQuery().get({
      limit: req.params.limit
    });
    reply.send(articles);
  });

  fastify.get("/articles", async function(req, reply) {
    const articles = await new ArticleQuery().get();
    reply.send(articles);
  });
};

export default routes;
