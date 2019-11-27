import fs from 'fs-extra';
import ReleaseQuery from '../models/ReleaseQuery';
import UserQuery from '../models/UserQuery';

export default {
  count: async (req, reply) => {
    const res = await new ReleaseQuery().count();
    reply.send([{ count: parseInt(res.count) }]);
  },
  create: async (req, reply) => {
    const id = await new UserQuery().getIdByEmail(req.decoded.user);
    const files = await req.raw.files;
    let image;
    let release;

    if (id) {
      if (files) {
        image = files.image;
        await fs.readFile(files.image.tempFilePath);
        image.data = await fs.readFile(files.image.tempFilePath);
      }

      release = await new ReleaseQuery().create({
        ...req.raw.body,
        user_id: id,
        image: image,
      });
    }

    if (release) {
      reply.send(release);
    } else {
      reply.status(500).send();
    }
  },
  del: async (req, reply) => {
    const deleted = await new ReleaseQuery().delete(req.body.id);

    if (deleted) {
      reply.send(deleted);
    } else {
      reply.status(404).send();
    }
  },
  get: async (req, reply) => {
    const releases = await new ReleaseQuery().get();
    reply.send(releases);
  },
  getOneBySlug: async (req, reply) => {
    const release = await new ReleaseQuery().findBySlug(
      req.params.slug,
    );

    if (release) {
      reply.send(release);
    } else {
      reply.status(404).send();
    }
  },
  getRange: async (req, reply) => {
    const releases = await new ReleaseQuery().get({
      offset: req.params.offset,
      limit: req.params.limit,
      order: req.params.order,
    });
    reply.send(releases);
  },
  getUnpublished: async (req, reply) => {
    const releases = await new ReleaseQuery().get(
      {
        offset: req.params.offset,
        limit: req.params.limit,
        order: req.params.order,
      },
      true,
    );
    reply.send(releases);
  },
  getWithLimit: async (req, reply) => {
    const releases = await new ReleaseQuery().get({
      limit: req.params.limit,
    });
    reply.send(releases);
  },
  getWithLimitAndOrder: async (req, reply) => {
    const releases = await new ReleaseQuery().get({
      limit: req.params.limit,
      order: req.params.order,
    });

    reply.send(releases);
  },
  publish: async (req, reply) => {
    const publishedRelease = await new ReleaseQuery().publish(
      req.body.id,
    );

    reply.send(publishedRelease);
  },
  unpublish: async (req, reply) => {
    const unpublishedRelease = await new ReleaseQuery().unpublish(
      req.body.id,
    );

    reply.send(unpublishedRelease);
  },
  update: async (req, reply) => {
    const files = await req.raw.files;
    let image;

    if (files) {
      image = files.image;
      await fs.readFile(files.image.tempFilePath);
      image.data = await fs.readFile(files.image.tempFilePath);
    }

    const updatedRelease = await new ReleaseQuery().update({
      image: image,
      ...req.raw.body,
    });

    reply.send(updatedRelease);
  },
};
