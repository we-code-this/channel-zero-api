import Fastify from 'fastify';
import fileUpload from 'fastify-file-upload';
import cors from 'fastify-cors';
import helmet from 'fastify-helmet';
import pino from 'pino';
import routes from './routes';

const logging = 'silent';
const log = pino({
  level: logging,
  prettyPrint: { colorize: true }
});

function buildApp() {
  const fastify = Fastify({ logger: log });

  fastify.register(helmet);

  fastify.register(cors, {
    origin: [process.env.ADMIN_ORIGIN, process.env.PUBLIC_ORIGIN]
  });
  fastify.register(fileUpload, {
    useTempFiles: true,
    tempFileDir: '/tmp/'
  });

  routes(fastify);

  return fastify;
}

export default buildApp;
