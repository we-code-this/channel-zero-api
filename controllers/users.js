import jwt from 'jsonwebtoken';
import UserQuery from '../models/UserQuery';
import config from '../config';
import {
  AUTHENTICATION_ERROR_MESSAGE,
  USER_NOT_FOUND,
} from '../messages/errors';
import { AUTHENTICATION_ERROR } from '../lib/constants';
import { jwtSecret } from '../lib/utilities';

export default {
  count: async (req, reply) => {
    const res = await new UserQuery().count();
    reply.send([{ count: parseInt(res.count) }]);
  },
  create: async (req, reply) => {
    const user = await new UserQuery().create({
      ...req.body,
    });

    if (user) {
      reply.send(user);
    } else {
      reply.status(500).send();
    }
  },
  del: async (req, reply) => {
    const deleted = await new UserQuery().delete(req.body.id);

    if (deleted) {
      reply.send(deleted);
    } else {
      reply.status(404).send();
    }
  },

  forgot: async (req, reply) => {
    const forgotResult = await new UserQuery().forgot(req.body.email);

    if (forgotResult === 'email sent') {
      reply.send({ message: forgotResult });
    } else {
      reply.send({
        message: `If a matching account was found an email was sent to ${req.body.email} to allow you to reset your password.`,
      });
    }
  },

  get: async (req, reply) => {
    const users = await new UserQuery().get();
    reply.send(users);
  },
  getOneById: async (req, reply) => {
    const user = await new UserQuery().findById(req.params.id);

    if (user) {
      reply.send(user);
    } else {
      reply.status(404).send();
    }
  },
  getRange: async (req, reply) => {
    const users = await new UserQuery().get({
      offset: req.params.offset,
      limit: req.params.limit,
      order: req.params.order,
    });
    reply.send(users);
  },
  getWithLimit: async (req, reply) => {
    const users = await new UserQuery().get({
      limit: req.params.limit,
    });
    reply.send(users);
  },
  getWithLimitAndOrder: async (req, reply) => {
    const users = await new UserQuery().get({
      limit: req.params.limit,
      order: req.params.order,
    });
    reply.send(users);
  },
  login: async (req, reply) => {
    let result = {};
    let status = 200;

    const loginResult = await new UserQuery().login(
      req.body.email,
      req.body.password,
    );

    if (loginResult.user) {
      const secret = jwtSecret();
      const payload = {
        id: loginResult.id,
        user: loginResult.user,
        groups: loginResult.groups,
      };
      const token = jwt.sign(payload, secret, config.jwtOptions);
      result.token = token;
      result.status = status;
      result.result = loginResult.user;
    } else {
      if (loginResult.error === AUTHENTICATION_ERROR) {
        status = 401;
        result.status = status;
        result.error = AUTHENTICATION_ERROR_MESSAGE;
      } else {
        status = 404;
        result.status = status;
        result.error = USER_NOT_FOUND;
      }
    }

    reply.code(status).send(result);
  },
  register: async (req, reply) => {
    const user = await new UserQuery().create(req.body);

    if (user) {
      reply.send(user);
    } else {
      reply.status(500).send();
    }
  },
  reset: async (req, reply) => {
    const resetResult = await new UserQuery().reset(req.body);

    reply.send(resetResult);
  },
  update: async (req, reply) => {
    const updatedUser = await new UserQuery().update(req.body);
    reply.send(updatedUser);
  },
};
