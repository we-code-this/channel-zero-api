import adRoutes from './ads';
import artistImageRoutes from './artist_images';
import artistRoutes from './artists';
import articleRoutes from './articles';
import endorsementRoutes from './endorsements';
import labelRoutes from './labels';
import promoRoutes from './promos';
import releaseRoutes from './releases';
import featureRoutes from './features';
import vendorRoutes from './vendors';
import videoRoutes from './videos';
import userRoutes from './users';

const routes = fastify => {
  adRoutes(fastify);
  artistImageRoutes(fastify);
  artistRoutes(fastify);
  articleRoutes(fastify);
  endorsementRoutes(fastify);
  labelRoutes(fastify);
  promoRoutes(fastify);
  releaseRoutes(fastify);
  featureRoutes(fastify);
  vendorRoutes(fastify);
  videoRoutes(fastify);
  userRoutes(fastify);
};

export default routes;
