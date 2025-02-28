const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

async function fetchJson(resource, init) {
  const cacheKey =
    typeof resource === "string" ? resource : resource.toString();

  const cached = cache.get(cacheKey);
  if (cached) {
    const { data, timestamp } = cached;
    if (Date.now() - timestamp < CACHE_TTL) {
      return data;
    }
    cache.delete(cacheKey);
  }

  const response = await fetch(resource, init);
  const data = await response.json();

  cache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });

  return data;
}

export default fetchJson;
