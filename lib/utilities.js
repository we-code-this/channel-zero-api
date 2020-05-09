import fs from 'fs';

// Allows for sqlite to be used during testing
// and postgres in other environments
export const normalizeID = (id) => {
  if (Array.isArray(id)) {
    return id[0];
  } else if (typeof id === 'object') {
    return id.id;
  } else {
    return id;
  }
};

export const normalizeCount = (count) => {
  if (Array.isArray(count)) {
    return count[0];
  } else {
    return count;
  }
};

export const normalizeRand = () => {
  if (process.env.NODE_ENV === 'test') {
    return 'random()';
  } else {
    return 'RAND()';
  }
};

export const jwtSecret = () => {
  let secret;
  if (process.env.JWT_SECRET_FILE) {
    secret = fs.readFileSync(process.env.JWT_SECRET_FILE, 'utf8');
  } else {
    secret = process.env.JWT_SECRET;
  }

  return secret;
};
