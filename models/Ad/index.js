let AdsModule;

async function model() {
  if (AdsModule) return AdsModule;

  AdsModule = (await import("./ad")).default;

  return AdsModule;
}

async function get() {
  const ads = await (await model()).get();
  return ads;
}

export default {
  get: get
};
