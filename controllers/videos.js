import VideoQuery from '../models/VideoQuery';
import UserQuery from '../models/UserQuery';

export default {
  count: async (req, reply) => {
    const res = await new VideoQuery().count();
    reply.send([{ count: parseInt(res.count) }]);
  },
  create: async (req, reply) => {
    const id = await new UserQuery().getIdByEmail(req.decoded.user);
    let video;

    if (id) {
      video = await new VideoQuery().create({
        ...req.body,
        user_id: id,
      });
    }

    if (video) {
      reply.send(video);
    } else {
      reply.status(500).send();
    }
  },
  del: async (req, reply) => {
    const deleted = await new VideoQuery().delete(req.body.id);

    if (deleted) {
      reply.send(deleted);
    } else {
      reply.status(404).send();
    }
  },
  get: async (req, reply) => {
    const videos = await new VideoQuery().get();
    reply.send(videos);
  },
  getByTitle: async (req, reply) => {
    const videos = await new VideoQuery().getByTitle();
    reply.send(videos);
  },
  getOneById: async (req, reply) => {
    const video = await new VideoQuery().findById(req.params.id);

    if (video) {
      reply.send(video);
    } else {
      reply.status(404).send();
    }
  },
  getRange: async (req, reply) => {
    const videos = await new VideoQuery().get({
      offset: req.params.offset,
      limit: req.params.limit,
      order: req.params.order,
    });
    reply.send(videos);
  },
  getWithLimit: async (req, reply) => {
    const videos = await new VideoQuery().get({
      limit: req.params.limit,
    });
    reply.send(videos);
  },
  getWithLimitAndOrder: async (req, reply) => {
    const videos = await new VideoQuery().get({
      limit: req.params.limit,
      order: req.params.order,
    });
    reply.send(videos);
  },
  update: async (req, reply) => {
    const updatedVideo = await new VideoQuery().update(req.body);
    reply.send(updatedVideo);
  },
};
