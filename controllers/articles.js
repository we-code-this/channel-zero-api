import fs from 'fs-extra';
import ArticleQuery from '../models/ArticleQuery';
import UserQuery from '../models/UserQuery';

export default {
  count: async (req, reply) => {
    const count = await new ArticleQuery().count();
    reply.send(count);
  },
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
  del: async (req, reply) => {
    const deleted = await new ArticleQuery().delete(req.body.id);

    if (deleted) {
      reply.send(deleted);
    } else {
      reply.status(404).send();
    }
  },
  get: async function(req, reply) {
    const articles = await new ArticleQuery().get();
    reply.send(articles);
  },
  getOneBySlug: async (req, reply) => {
    const article = await new ArticleQuery().findBySlug(req.params.slug);

    if (article) {
      reply.send(article);
    } else {
      reply.status(404).send();
    }
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
  },
  publish: async (req, reply) => {
    const publishedArticle = await new ArticleQuery().publish(req.body.id);

    reply.send(publishedArticle);
  },
  unpublish: async (req, reply) => {
    const unpublishedArticle = await new ArticleQuery().unpublish(req.body.id);

    reply.send(unpublishedArticle);
  },
  update: async (req, reply) => {
    const files = await req.raw.files;
    let image;

    if (files) {
      image = files.image;
      await fs.readFile(files.image.tempFilePath);
      image.data = await fs.readFile(files.image.tempFilePath);
    }

    const updatedArticle = await new ArticleQuery().update({
      image: image,
      ...req.raw.body
    });

    reply.send(updatedArticle);
  }
};
