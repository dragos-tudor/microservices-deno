import { getCacheItem } from "../cache-items/getting.js"
import { existsCacheItem, isExpiredCacheItem } from "../cache-items/verifying.js"

export const getCacheData = (cache, cacheKey, currentDate) =>
  existsCacheItem(cache, cacheKey)?
    !isExpiredCacheItem(getCacheItem(cache, cacheKey), currentDate)?
      getCacheItem(cache, cacheKey)?.cacheData:
      undefined:
    undefined