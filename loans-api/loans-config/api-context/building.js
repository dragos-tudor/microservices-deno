
export const buildApiContext = (apiContext = {}) => Object.freeze({
  setApiConfig(apiConfig = {}) { apiContext.apiConfig = apiConfig; return this; },
  setCache(cache) { apiContext.cache = cache; return this; },
  setDb(db) { apiContext.db = db; return this; },
  setGetUtc(getUtc = Date.now) { apiContext.getUtc = getUtc; return this; },
  setEncryptionKey(encryptionKey) { apiContext.encryptionKey = encryptionKey; return this; },
  build: () => Object.freeze(apiContext)
})