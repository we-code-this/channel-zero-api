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

async function findBySlug(slug) {
  const release = await (await model()).findBySlug(slug);
  return release;
}

export default {
  get: get,
  findBySlug: findBySlug
};
