import Fastify from 'fastify';
import fileUpload from 'fastify-file-upload';
import cors from 'fastify-cors';
import helmet from 'fastify-helmet';
import pino from 'pino';
import routes from './routes';

const logging = 'info';
const log = pino({
  level: logging,
  prettyPrint: { colorize: true },
});

function buildApp() {
  const fastify = Fastify({ logger: log });

  fastify.register(helmet);

  fastify.register(cors, {
    origin: [process.env.DEV_HOST, process.env.EDGE_HOST, process.env.STAGING_HOST, process.env.CLIENT_HOST, process.env.ADMIN_HOST],
  });

  fastify.register(fileUpload, {
    useTempFiles: true,
    tempFileDir: '/tmp/',
  });

  routes(fastify);

  return fastify;
}

export default buildApp;
