let ArticlesModule;

async function model() {
  if (ArticlesModule) return ArticlesModule;

  ArticlesModule = (await import("./article")).default;

  return ArticlesModule;
}

async function get(params = {}) {
  const articles = await (await model()).get(params);
  return articles;
}

export default {
  get: get
};
