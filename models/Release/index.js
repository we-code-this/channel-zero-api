let ReleasesModule;

async function model() {
  if (ReleasesModule) return ReleasesModule;

  ReleasesModule = (await import("./release")).default;

  return ReleasesModule;
}

async function get(params = {}) {
  const releases = await (await model()).get(params);
  return releases;
}

export default {
  get: get
};
