import fs from 'fs-extra'
import ArtistImageQuery from "../models/ArtistImageQuery";

const routes = fastify => {
  fastify.post("/artist/image", async function(req, reply) {
    const files = req.raw.files;
    let image;

    if (files) {
      image = files.image;
      await fs.readFile(files.image.tempFilePath);
      image.data = await fs.readFile(files.image.tempFilePath);
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
      await fs.readFile(files.image.tempFilePath);
      image.data = await fs.readFile(files.image.tempFilePath);
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
};

export default routes;
