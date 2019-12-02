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
};
