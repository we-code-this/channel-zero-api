import Fastify from "fastify";
import fileUpload from "fastify-file-upload";
import cors from "fastify-cors";
import Ad from "./models/Ad";
import ArticleQuery from "./models/ArticleQuery";
import ArtistQuery from "./models/ArtistQuery";
import FeatureQuery from "./models/FeatureQuery";
import PromoQuery from "./models/PromoQuery";
import ReleaseQuery from "./models/ReleaseQuery";
import VendorQuery from "./models/VendorQuery";
import ArtistImageQuery from "./models/ArtistImageQuery";
import pino from "pino";

const logging = "info";
const log = pino({
  level: logging,
  prettyPrint: { colorize: true }
});

function buildApp() {
  const fastify = Fastify({ logger: log });

  fastify.register(cors, { origin: process.env.CLIENT_ORIGIN });
  fastify.register(fileUpload, {
    useTempFiles: true,
    tempFileDir: "/tmp/"
  });

  fastify.get("/a", async function(req, reply) {
    const ads = await new Ad().random();
    reply.send(ads);
  });

  fastify.post("/artist/image", async function(req, reply) {
    const files = await req.raw.files;
    let image;

    if (files) {
      image = files.image;
    }

    const resultImage = await new ArtistImageQuery().create({
      image: image,
      artist_id: req.raw.body.artist_id
    });

    if (resultImage) {
      reply.send(resultImage);
    } else {
      reply.status(500).send();
    }
  });

  fastify.patch("/artist/image", async function(req, reply) {
    const files = await req.raw.files;
    let image;

    if (files) {
      image = files.image;
    }

    const resultImage = await new ArtistImageQuery().update({
      image: image,
      id: req.raw.body.id
    });

    if (resultImage) {
      reply.send(resultImage);
    } else {
      reply.status(500).send();
    }
  });

  fastify.delete("/artist/image", async function(req, reply) {
    const deleted = await new ArtistImageQuery().delete(req.body.id);

    if (deleted) {
      reply.send(deleted);
    } else {
      reply.status(404).send();
    }
  });

  fastify.get("/artist/image/:id", async function(req, reply) {
    const image = await new ArtistImageQuery().findById(req.params.id);

    if (image) {
      reply.send(image);
    } else {
      reply.status(404).send();
    }
  });

  fastify.get("/artist/:slug", async function(req, reply) {
    const artist = await new ArtistQuery().findBySlug(req.params.slug);

    if (artist) {
      reply.send(artist);
    } else {
      reply.status(404).send();
    }
  });

  fastify.post("/artist/:slug", async function(req, reply) {
    const updatedArtist = await new ArtistQuery().updateBySlug(
      req.params.slug,
      req.body
    );
    reply.send(updatedArtist);
  });

  fastify.delete("/artist", async function(req, reply) {
    const deleted = await new ArtistQuery().delete(req.body.id);

    if (deleted) {
      reply.send(deleted);
    } else {
      reply.status(404).send();
    }
  });

  fastify.post("/artist", async function(req, reply) {
    const artist = await new ArtistQuery().create(req.body);

    if (artist) {
      reply.send(artist);
    } else {
      reply.status(500).send();
    }
  });

  fastify.get("/artists/range/:offset/:limit/:order", async function(
    req,
    reply
  ) {
    const artists = await new ArtistQuery().get({
      offset: req.params.offset,
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(artists);
  });

  fastify.get("/artists/:limit/:order", async function(req, reply) {
    const artists = await new ArtistQuery().get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(artists);
  });

  fastify.get("/artists/count", async function(req, reply) {
    const count = await new ArtistQuery().count();
    reply.send(count);
  });

  fastify.get("/artists/:limit", async function(req, reply) {
    const artists = await new ArtistQuery().get({
      limit: req.params.limit
    });
    reply.send(artists);
  });

  fastify.get("/artists", async function(req, reply) {
    const artists = await new ArtistQuery().get();
    reply.send(artists);
  });

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

  fastify.get("/promos/:location/:limit", async function(req, reply) {
    const promos = await new PromoQuery().get({
      location: req.params.location,
      limit: req.params.limit
    });
    reply.send(promos);
  });

  fastify.get("/promos/:location", async function(req, reply) {
    const promos = await new PromoQuery().get({
      location: req.params.location
    });
    reply.send(promos);
  });

  fastify.get("/promos", async function(req, reply) {
    const promos = await new PromoQuery().get();
    reply.send(promos);
  });

  fastify.get("/releases/:limit/:order", async function(req, reply) {
    const releases = await new ReleaseQuery().get({
      limit: req.params.limit,
      order: req.params.order
    });

    reply.send(releases);
  });

  fastify.get("/releases/:limit", async function(req, reply) {
    const releases = await new ReleaseQuery().get({
      limit: req.params.limit
    });
    reply.send(releases);
  });

  fastify.get("/releases", async function(req, reply) {
    const releases = await new ReleaseQuery().get();
    reply.send(releases);
  });

  fastify.get("/release/:slug", async function(req, reply) {
    const release = await new ReleaseQuery().findBySlug(req.params.slug);
    reply.send(release);
  });

  fastify.get("/features/:limit/:order", async function(req, reply) {
    const features = await new FeatureQuery().get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(features);
  });

  fastify.get("/features/:limit", async function(req, reply) {
    const features = await new FeatureQuery().get({
      limit: req.params.limit
    });
    reply.send(features);
  });

  fastify.get("/features", async function(req, reply) {
    const features = await new FeatureQuery().get();
    reply.send(features);
  });

  fastify.get("/feature", async function(req, reply) {
    const feature = await new FeatureQuery().current();
    reply.send(feature);
  });

  fastify.get("/vendors", async function(req, reply) {
    const vendors = await new VendorQuery().all();
    reply.send(vendors);
  });

  return fastify;
}

export default buildApp;
