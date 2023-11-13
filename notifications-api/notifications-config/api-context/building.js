
export const buildApiContext = (apiContext = {}) => Object.freeze({
  setApiConfig(apiConfig = {}) { apiContext.apiConfig = apiConfig; return this; },
  setDb(db) { apiContext.db = db; return this; },
  setGetUtc(getUtc = Date.now) { apiContext.getUtc = getUtc; return this; },
  setMediator(mediator = Date.now) { apiContext.mediator = mediator; return this; },
  setSigningKey(signingKey) { apiContext.signingKey = signingKey; return this; },
  build: () => Object.freeze(apiContext)
})