import Fastify from "fastify";
import cors from "fastify-cors";
import { default as Ad } from "./models/Ad";
import { default as Article } from "./models/Article";
import { default as Feature } from "./models/Feature";
import { default as Promo } from "./models/Promo";
import { default as Release } from "./models/Release";
import pino from "pino";

const logging = "silent";
const log = pino({
  level: logging,
  prettyPrint: { colorize: true }
});

function buildApp() {
  const fastify = Fastify({ logger: log });

  fastify.register(cors, { origin: process.env.CLIENT_ORIGIN });

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

  fastify.get("/features/:limit/:order", async function(req, reply) {
    const features = await Feature.get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(features);
  });

  fastify.get("/features/:limit", async function(req, reply) {
    const features = await Feature.get({ limit: req.params.limit });
    reply.send(features);
  });

  fastify.get("/features", async function(req, reply) {
    const features = await Feature.get();
    reply.send(features);
  });

  fastify.get("/feature", async function(req, reply) {
    const feature = await Feature.current();
    reply.send(feature);
  });

  return fastify;
}

export default buildApp;
