import jwt from 'jsonwebtoken';
import UserQuery from '../models/UserQuery';

import { AUTHENTICATION_ERROR } from '../lib/constants';

export default {
  login: async (req, reply) => {
    let result = {};
    let status = 200;

    const loginResult = await new UserQuery().login(
      req.body.email,
      req.body.password
    );

    if (loginResult.user) {
      const payload = { user: loginResult.user.email };
      const token = jwt.sign(payload, process.env.AUTH_SECRET, {
        expiresIn: '1d',
        issuer: process.env.JWT_ISSUER
      });
      result.token = token;
      result.status = status;
      result.result = loginResult.user;
    } else {
      if (loginResult.error === AUTHENTICATION_ERROR) {
        status = 401;
        result.status = status;
        result.error = 'Authentication error';
      } else {
        status = 404;
        result.status = status;
        result.error = 'User not found';
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
  }
};
