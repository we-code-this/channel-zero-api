import Fastify from "fastify";
import cors from "fastify-cors";
import Ad from "./models/Ad";
import ArticleCollection from "./models/ArticleCollection";
import ArtistCollection from "./models/ArtistCollection";
import FeatureCollection from "./models/FeatureCollection";
import PromoCollection from "./models/PromoCollection";
import ReleaseCollection from "./models/ReleaseCollection";
import VendorCollection from "./models/VendorCollection";
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
    const ads = await new Ad().random();
    reply.send(ads);
  });

  fastify.get("/artists/:limit/:order", async function(req, reply) {
    const artists = await new ArtistCollection().get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(artists);
  });

  fastify.get("/artists/:limit", async function(req, reply) {
    const artists = await new ArtistCollection().get({
      limit: req.params.limit
    });
    reply.send(artists);
  });

  fastify.get("/artists", async function(req, reply) {
    const artists = await new ArtistCollection().get();
    reply.send(artists);
  });

  fastify.get("/articles/:limit/:order", async function(req, reply) {
    const articles = await new ArticleCollection().get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(articles);
  });

  fastify.get("/articles/:limit", async function(req, reply) {
    const articles = await new ArticleCollection().get({
      limit: req.params.limit
    });
    reply.send(articles);
  });

  fastify.get("/articles", async function(req, reply) {
    const articles = await new ArticleCollection().get();
    reply.send(articles);
  });

  fastify.get("/promos/:location/:limit", async function(req, reply) {
    const promos = await new PromoCollection().get({
      location: req.params.location,
      limit: req.params.limit
    });
    reply.send(promos);
  });

  fastify.get("/promos/:location", async function(req, reply) {
    const promos = await new PromoCollection().get({
      location: req.params.location
    });
    reply.send(promos);
  });

  fastify.get("/promos", async function(req, reply) {
    const promos = await new PromoCollection().get();
    reply.send(promos);
  });

  fastify.get("/releases/:limit/:order", async function(req, reply) {
    const releases = await new ReleaseCollection().get({
      limit: req.params.limit,
      order: req.params.order
    });

    reply.send(releases);
  });

  fastify.get("/releases/:limit", async function(req, reply) {
    const releases = await new ReleaseCollection().get({
      limit: req.params.limit
    });
    reply.send(releases);
  });

  fastify.get("/releases", async function(req, reply) {
    const releases = await new ReleaseCollection().get();
    reply.send(releases);
  });

  fastify.get("/release/:slug", async function(req, reply) {
    const release = await new ReleaseCollection().findBySlug(req.params.slug);
    reply.send(release);
  });

  fastify.get("/features/:limit/:order", async function(req, reply) {
    const features = await new FeatureCollection().get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(features);
  });

  fastify.get("/features/:limit", async function(req, reply) {
    const features = await new FeatureCollection().get({
      limit: req.params.limit
    });
    reply.send(features);
  });

  fastify.get("/features", async function(req, reply) {
    const features = await new FeatureCollection().get();
    reply.send(features);
  });

  fastify.get("/feature", async function(req, reply) {
    const feature = await new FeatureCollection().current();
    reply.send(feature);
  });

  fastify.get("/vendors", async function(req, reply) {
    const vendors = await new VendorCollection().all();
    reply.send(vendors);
  });

  return fastify;
}

export default buildApp;
