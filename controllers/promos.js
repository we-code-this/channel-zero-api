import fs from "fs-extra";
import PromoQuery from "../models/PromoQuery";
import UserQuery from "../models/UserQuery";

export default {
  count: async (req, reply) => {
    const res = await new PromoQuery().count();
    reply.send([{ count: parseInt(res.count) }]);
  },
  create: async (req, reply) => {
    const id = await new UserQuery().getIdByEmail(req.decoded.user);
    const files = await req.raw.files;
    let image;
    let promo;

    if (id) {
      if (files) {
        image = files.image;
        await fs.readFile(files.image.tempFilePath);
        image.data = await fs.readFile(files.image.tempFilePath);
      }

      promo = await new PromoQuery().create({
        ...req.raw.body,
        user_id: id,
        image: image
      });
    }

    if (promo) {
      reply.send(promo);
    } else {
      reply.status(500).send();
    }
  },
  del: async (req, reply) => {
    const deleted = await new PromoQuery().delete(req.body.id);

    if (deleted) {
      reply.send(deleted);
    } else {
      reply.status(404).send();
    }
  },
  get: async (req, reply) => {
    const promos = await new PromoQuery().get();
    reply.send(promos);
  },
  getOneById: async (req, reply) => {
    const promo = await new PromoQuery().findById(req.params.id);

    if (promo) {
      reply.send(promo);
    } else {
      reply.status(404).send();
    }
  },
  getRange: async (req, reply) => {
    const promos = await new PromoQuery().get({
      offset: req.params.offset,
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(promos);
  },
  getUnpublished: async (req, reply) => {
    const promos = await new PromoQuery().get(
      {
        offset: req.params.offset,
        limit: req.params.limit,
        order: req.params.order
      },
      true
    );

    reply.send(promos);
  },
  getWithLimit: async (req, reply) => {
    const promos = await new PromoQuery().get({
      limit: req.params.limit
    });
    reply.send(promos);
  },
  getWithLimitAndOrder: async (req, reply) => {
    const promos = await new PromoQuery().get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(promos);
  },
  getWithLocation: async (req, reply) => {
    const promos = await new PromoQuery().get({
      location: req.params.location
    });
    reply.send(promos);
  },
  getWithLocationAndLimit: async (req, reply) => {
    const promos = await new PromoQuery().get({
      location: req.params.location,
      limit: req.params.limit
    });
    reply.send(promos);
  },
  publish: async (req, reply) => {
    const publishedPromo = await new PromoQuery().publish(req.body.id);

    reply.send(publishedPromo);
  },
  unpublish: async (req, reply) => {
    const unpublishedPromo = await new PromoQuery().unpublish(req.body.id);

    reply.send(unpublishedPromo);
  },
  update: async (req, reply) => {
    const files = await req.raw.files;
    let image;

    if (files) {
      image = files.image;
      await fs.readFile(files.image.tempFilePath);
      image.data = await fs.readFile(files.image.tempFilePath);
    }

    const updatedPromo = await new PromoQuery().update({
      image: image,
      ...req.raw.body
    });

    reply.send(updatedPromo);
  }
};
