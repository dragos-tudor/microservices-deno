
export const buildApiContext = (apiContext = {}) => Object.freeze({
  setApiConfig(apiConfig = {}) { apiContext.apiConfig = apiConfig; return this; },
  setFetch(fetch) { apiContext.fetch = fetch; return this; },
  setGetUtc(getUtc = Date.now) { apiContext.getUtc = getUtc; return this; },
  build: () => apiContext
})