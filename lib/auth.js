import UserQuery from '../models/UserQuery';

export const isAdmin = (req, res, next) => {
  let result;
  const email = req.decoded.user;
  new UserQuery()
    .isInGroup('admin', email)
    .then(isInGroup => {
      if (isInGroup) {
        next();
      } else {
        result = {
          error: 'Forbidden',
          status: 403
        };
        res.status(403).send(result);
      }
    })
    .catch(err => {
      result = {
        error: 'Forbidden',
        status: 403
      };
      res.status(403).send(result);
    });
};
