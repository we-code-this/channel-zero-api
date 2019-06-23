import jwt from 'jsonwebtoken';
import UserQuery from '../models/UserQuery';

const routes = fastify => {
  fastify.post('/login', async function(req, reply) {
    const user = await new UserQuery().login(req.body.email, req.body.password);

    if (user) {
      const token = jwt.sign(user, process.env.AUTH_SECRET);
      reply.header('Authorization', `Bearer ${token}`).send({ success: true });
    } else {
      reply.code(401).send({ error: 'Invalid email or password supplied.' });
    }
  });

  fastify.post('/register', async function(req, reply) {
    const user = await new UserQuery().create(req.body);

    if (user) {
      reply.send(user);
    } else {
      reply.status(500).send();
    }
  });
};

export default routes;
