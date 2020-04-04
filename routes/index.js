import adRoutes from './ads';
import artistImageRoutes from './artist_images';
import artistRoutes from './artists';
import articleRoutes from './articles';
import endorsementRoutes from './endorsements';
import labelRoutes from './labels';
import promoRoutes from './promos';
import releaseRoutes from './releases';
import releaseVendorRoutes from './release_vendors';
import discRoutes from './discs';
import creditRoutes from './credits';
import featureRoutes from './features';
import trackRoutes from './tracks';
import vendorRoutes from './vendors';
import videoRoutes from './videos';
import userRoutes from './users';

const routes = (fastify) => {
  fastify.get('/health', async (req, reply) => {
    reply.send('OK');
  });
  adRoutes(fastify);
  artistImageRoutes(fastify);
  artistRoutes(fastify);
  articleRoutes(fastify);
  endorsementRoutes(fastify);
  labelRoutes(fastify);
  promoRoutes(fastify);
  releaseRoutes(fastify);
  releaseVendorRoutes(fastify);
  discRoutes(fastify);
  creditRoutes(fastify);
  trackRoutes(fastify);
  featureRoutes(fastify);
  vendorRoutes(fastify);
  videoRoutes(fastify);
  userRoutes(fastify);
};

export default routes;
