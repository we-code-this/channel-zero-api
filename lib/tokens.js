import jwt from 'jsonwebtoken';
import config from '../config';

export const validate = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  let result;

  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1];

    try {
      result = jwt.verify(token, process.env.JWT_SECRET, config.jwtOptions);
      req.decoded = result;
      next();
    } catch (err) {
      result = {
        error: 'Authentication Error. Invalid token.',
        status: 401
      };
      res.status(401).send(result);
    }
  } else {
    result = {
      error: 'Authentication error. Token required.',
      status: 401
    };
    res.status(401).send(result);
  }
};
