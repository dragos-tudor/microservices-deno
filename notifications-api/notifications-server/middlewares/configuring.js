import { extractJwtIdentity } from "../../../webapi-modules/webapi-jwt/mod.js"
import { authenticatingMiddleware, exceptionHandlingMiddleware, loggingMiddleware, rateLimitingMiddleware, tracingMiddleware } from "../../../webapi-modules/webapi-middlewares/mod.js"
import { getRateLimitsOptions, getApiName, getJwtIssuer } from "../../notifications-config/mod.js"

export const configMiddlewares = (server, router, apiContext) =>
  server
    .use(rateLimitingMiddleware(getRateLimitsOptions(apiContext.apiConfig), {}))
    .use(tracingMiddleware(apiContext.apiConfig, apiContext.getUtc))
    .use(loggingMiddleware)
    .use(exceptionHandlingMiddleware)
    .use(authenticatingMiddleware(
      extractJwtIdentity(
        [getJwtIssuer(apiContext.apiConfig)],
        [getApiName(apiContext.apiConfig)],
        apiContext.getUtc,
        apiContext.signingKey)
    ))
    .use(router.routes())
    .use(router.allowedMethods())
