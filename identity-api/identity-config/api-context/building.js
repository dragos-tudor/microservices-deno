
export const buildApiContext = (apiContext = {}) => Object.freeze({
  setApiConfig(apiConfig = {}) { apiContext.apiConfig = apiConfig; return this; },
  setDb(db) { apiContext.db = db; return this; },
  setGetUtc(getUtc = Date.now) { apiContext.getUtc = getUtc; return this; },
  setMediator(mediator) { apiContext.mediator = mediator; return this; },
  setFetch(fetch) { apiContext.fetch = fetch; return this; },
  setEncryptionKey(encryptionKey) { apiContext.encryptionKey = encryptionKey; return this; },
  setSigningKey(signingKey) { apiContext.signingKey = signingKey; return this; },
  build: () => Object.freeze(apiContext)
})