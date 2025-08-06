const cache = new Map();

exports.setCache = (key, value, ttl = 60 * 60 * 1000) => {
  cache.set(key, { value, expires: Date.now() + ttl });
}

exports.getCache = (key) => {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}