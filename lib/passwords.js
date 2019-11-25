import bcrypt from 'bcrypt';
import { sanitize } from './strings';

export const hash = password => {
  const saltRounds = 10;

  return bcrypt.hashSync(password, saltRounds);
};

export const compare = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
