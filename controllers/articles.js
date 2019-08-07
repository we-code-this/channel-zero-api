import fs from 'fs-extra';
import ArticleQuery from '../models/ArticleQuery';
import UserQuery from '../models/UserQuery';

export default {
  create: async (req, reply) => {
    const id = await new UserQuery().getIdByEmail(req.decoded.user);
    const files = await req.raw.files;
    let image;
    let article;

    if (id) {
      if (files) {
        image = files.image;
        await fs.readFile(files.image.tempFilePath);
        image.data = await fs.readFile(files.image.tempFilePath);
      }

      article = await new ArticleQuery().create({
        ...req.raw.body,
        user_id: id,
        image: image
      });
    }

    if (article) {
      reply.send(article);
    } else {
      reply.status(500).send();
    }
  },
  get: async function(req, reply) {
    const articles = await new ArticleQuery().get();
    reply.send(articles);
  },
  getWithLimit: async (req, reply) => {
    const articles = await new ArticleQuery().get({
      limit: req.params.limit
    });
    reply.send(articles);
  },
  getWithLimitAndOrder: async (req, reply) => {
    const articles = await new ArticleQuery().get({
      limit: req.params.limit,
      order: req.params.order
    });
    reply.send(articles);
  }
};
