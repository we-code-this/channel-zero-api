import dotenv from "dotenv";
import buildApp from "./app";

dotenv.config();

const app = buildApp();

const start = async () => {
  try {
    await app.listen(process.env.APP_PORT ? process.env.APP_PORT : 3001);
    app.log.info(`server listening on ${app.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
