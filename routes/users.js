import users from '../controllers/users';

const routes = fastify => {
  fastify.post('/login', users.login);
  fastify.post('/register', users.register);
};

export default routes;
