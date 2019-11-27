// Allows for sqlite to be used during testing
// and postgres in other environments
export const normalizeID = id => {
  if (Array.isArray(id)) {
    return id[0];
  } else if (typeof id === 'object') {
    return id.id;
  } else {
    return id;
  }
};

export const normalizeCount = count => {
  if (Array.isArray(count)) {
    return count[0];
  } else {
    return count;
  }
};
