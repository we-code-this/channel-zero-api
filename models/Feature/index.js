let FeaturesModule;

async function model() {
  if (FeaturesModule) return FeaturesModule;

  FeaturesModule = (await import("./feature")).default;

  return FeaturesModule;
}

async function get(params = {}) {
  const features = await (await model()).get(params);
  return features;
}

async function current() {
  const feature = await (await model()).current();
  return feature;
}

export default {
  get: get,
  current: current
};
