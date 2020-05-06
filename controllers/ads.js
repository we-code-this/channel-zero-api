import fs from 'fs-extra';
import AdQuery from '../models/AdQuery';
import UserQuery from '../models/UserQuery';

export default {
  count: async (req, reply) => {
    const res = await new AdQuery().count();
    reply.send([{ count: parseInt(res.count) }]);
  },
  create: async (req, reply) => {
    const id = await new UserQuery().getIdByEmail(req.decoded.user);
    const files = await req.raw.files;
    let desktop_image;
    let mobile_image;
    let ad;

    if (id) {
      if (files) {
        desktop_image = files.desktop_image;
        mobile_image = files.mobile_image;

        if (files.desktop_image) {
          await fs.readFile(files.desktop_image.tempFilePath);
          desktop_image.data = await fs.readFile(
            files.desktop_image.tempFilePath,
          );
        }

        if (files.mobile_image) {
          await fs.readFile(files.mobile_image.tempFilePath);
          mobile_image.data = await fs.readFile(
            files.mobile_image.tempFilePath,
          );
        }
      }

      ad = await new AdQuery().create({
        ...req.raw.body,
        user_id: id,
        desktop_image: desktop_image,
        mobile_image: mobile_image,
      });
    }

    if (ad) {
      reply.send(ad);
    } else {
      reply.status(500).send();
    }
  },
  del: async (req, reply) => {
    const adId = req.body.id;
    const deleted = await new AdQuery().delete(adId);

    if (deleted) {
      reply.send(deleted);
    } else {
      reply.status(404).send();
    }
  },
  get: async (req, reply) => {
    const ads = await new AdQuery().get();
    reply.send(ads);
  },
  getOneById: async (req, reply) => {
    const ad = await new AdQuery().findById(req.params.id);

    if (ad) {
      reply.send(ad);
    } else {
      reply.status(404).send();
    }
  },
  getRange: async (req, reply) => {
    const ads = await new AdQuery().get({
      offset: req.params.offset,
      limit: req.params.limit,
      order: req.params.order,
    });
    reply.send(ads);
  },
  getWithLimit: async (req, reply) => {
    const ads = await new AdQuery().get({
      limit: req.params.limit,
    });
    reply.send(ads);
  },
  getWithLimitAndOrder: async (req, reply) => {
    const ads = await new AdQuery().get({
      limit: req.params.limit,
      order: req.params.order,
    });

    reply.send(ads);
  },
  publish: async (req, reply) => {
    const publishedAd = await new AdQuery().publish(req.body.id);

    reply.send(publishedAd);
  },
  random: async (req, reply) => {
    const ad = await new AdQuery().random();
    reply.send(ad);
  },
  unpublish: async (req, reply) => {
    const unpublishedAd = await new AdQuery().unpublish(req.body.id);

    reply.send(unpublishedAd);
  },
  update: async (req, reply) => {
    const files = await req.raw.files;
    let desktop_image;
    let mobile_image;

    if (files) {
      desktop_image = files.desktop_image;
      mobile_image = files.mobile_image;

      if (files.desktop_image) {
        await fs.readFile(files.desktop_image.tempFilePath);
        desktop_image.data = await fs.readFile(
          files.desktop_image.tempFilePath,
        );
      }

      if (files.mobile_image) {
        await fs.readFile(files.mobile_image.tempFilePath);
        mobile_image.data = await fs.readFile(
          files.mobile_image.tempFilePath,
        );
      }
    }

    const updatedAd = await new AdQuery().update({
      desktop_image: desktop_image,
      mobile_image: mobile_image,
      ...req.raw.body,
    });

    reply.send(updatedAd);
  },
};
