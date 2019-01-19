let ArticlesModule;

async function model() {
  if (ArticlesModule) return ArticlesModule;
  // const filename = process.env.NODE_ENV === "test" ? "test" : "article";
  const filename = "article";

  ArticlesModule = (await import(`./${filename}`)).default;

  return ArticlesModule;
}

async function get(params = {}) {
  const articles = await (await model()).get(params);
  return articles;
}

export default {
  get: get
};
