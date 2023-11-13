import { createCacheItem } from "../cache-items/creating.js"
import { setCacheItem } from "../cache-items/setting.js"
import { createDefaultCacheOptions } from "../cache-options/creating.js"

export const setCacheData = (cache, cacheKey, cacheData, cacheOptions = createDefaultCacheOptions()) =>
  setCacheItem(cache, cacheKey, createCacheItem(cacheData, cacheOptions))?.cacheData