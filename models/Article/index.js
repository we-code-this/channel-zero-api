let ArticlesModule;

async function model() {
  if (ArticlesModule) return ArticlesModule;
  const filename = process.env.NODE_ENV === "test" ? "test" : "article";

  ArticlesModule = await import(`./${filename}`);

  return ArticlesModule;
}

async function get(params = {}) {
  const articles = await (await model()).get(params);
  return articles;
}

export default {
  get: get
};
