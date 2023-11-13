import { extractCookieIdentity } from "../../../webapi-modules/webapi-cookies/mod.js"
import { authenticatingMiddleware, exceptionHandlingMiddleware, loggingMiddleware, rateLimitingMiddleware, tracingMiddleware } from "../../../webapi-modules/webapi-middlewares/mod.js"
import { getCookieName, getRateLimitsOptions } from "../../loans-config/mod.js"

export const configMiddlewares = (server, router, apiContext) =>
  server
    .use(rateLimitingMiddleware(getRateLimitsOptions(apiContext.apiConfig), {}))
    .use(tracingMiddleware(apiContext.apiConfig, apiContext.getUtc))
    .use(loggingMiddleware)
    .use(exceptionHandlingMiddleware)
    .use(authenticatingMiddleware(extractCookieIdentity(getCookieName(apiContext.apiConfig), apiContext.encryptionKey)))
    .use(router.routes())
    .use(router.allowedMethods())
