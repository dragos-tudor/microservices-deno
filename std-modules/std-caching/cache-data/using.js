import { getCacheData } from "./getting.js"
import { setCacheData } from "./setting.js"
import { createCacheOptions } from "../cache-options/creating.js"

export const useCacheData = async (cache, cacheKey, getData, expiresAfter, currentDate) =>
  getCacheData(cache, cacheKey, currentDate) ||
  setCacheData(cache, cacheKey, await getData(), createCacheOptions(currentDate + expiresAfter))