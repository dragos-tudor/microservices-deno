
export const existsCacheItem = (cache, cacheKey) => cache[cacheKey]

export const isExpiredCacheItem = (cacheItem, currentDate) => cacheItem.cacheOptions.expireAt < currentDate