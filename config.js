export default {
  jwtOptions: {
    expiresIn: '1d',
    issuer: process.env.JWT_ISSUER
  }
};
