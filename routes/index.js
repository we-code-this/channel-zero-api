import adRoutes from "./ad";
import artistImageRoutes from "./artist_image";
import artistRoutes from "./artist";
import articleRoutes from "./article";
import labelRoutes from "./label";
import promoRoutes from "./promo";
import releaseRoutes from "./release";
import featureRoutes from "./feature";
import vendorRoutes from "./vendor";
import userRoutes from "./user";

const routes = fastify => {
  adRoutes(fastify);
  artistImageRoutes(fastify);
  artistRoutes(fastify);
  articleRoutes(fastify);
  labelRoutes(fastify);
  promoRoutes(fastify);
  releaseRoutes(fastify);
  featureRoutes(fastify);
  vendorRoutes(fastify);
  userRoutes(fastify);
};

export default routes;
