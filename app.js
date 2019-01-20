import Fastify from "fastify";
import { default as Ad } from "./models/Ad";
import { default as Article } from "./models/Article";
import { default as Promo } from "./models/Promo";
import { default as Release } from "./models/Release";

function buildApp() {
  const logging = false;
  const fastify = Fastify({ logger: logging });

  fastify.get("/a", async function(req, reply) {
    const ads = await Ad.get();
    reply.send(ads);
  });

  fastify.get("/articles/:limit/:order", async function(req, reply) {
    const articles = await Article.get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(articles);
  });

  fastify.get("/articles/:limit", async function(req, reply) {
    const articles = await Article.get({ limit: req.params.limit });
    reply.send(articles);
  });

  fastify.get("/articles", async function(req, reply) {
    const articles = await Article.get();
    reply.send(articles);
  });

  fastify.get("/promos/:location/:limit", async function(req, reply) {
    const promos = await Promo.get({
      location: req.params.location,
      limit: req.params.limit
    });
    reply.send(promos);
  });

  fastify.get("/promos/:location", async function(req, reply) {
    const promos = await Promo.get({ location: req.params.location });
    reply.send(promos);
  });

  fastify.get("/promos", async function(req, reply) {
    const promos = await Promo.get();
    reply.send(promos);
  });

  fastify.get("/releases/:limit/:order", async function(req, reply) {
    const releases = await Release.get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(releases);
  });

  fastify.get("/releases/:limit", async function(req, reply) {
    const releases = await Release.get({ limit: req.params.limit });
    reply.send(releases);
  });

  fastify.get("/releases", async function(req, reply) {
    const releases = await Release.get();
    reply.send(releases);
  });

  fastify.get("/release/:slug", async function(req, reply) {
    const release = await Release.findBySlug(req.params.slug);
    reply.send(release);
  });

  return fastify;
}

export default buildApp;
