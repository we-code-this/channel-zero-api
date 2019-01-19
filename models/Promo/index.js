let PromosModule;

async function model() {
  if (PromosModule) return PromosModule;

  PromosModule = (await import("./promo")).default;

  return PromosModule;
}

async function get(params = {}) {
  const articles = await (await model()).get(params);
  return articles;
}

export default {
  get: get
};
