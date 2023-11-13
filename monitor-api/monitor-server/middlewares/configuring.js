import { exceptionHandlingMiddleware, loggingMiddleware, redirectingMiddleware, tracingMiddleware } from "../../../webapi-modules/webapi-middlewares/mod.js"
import { getHttpsServerBaseUrl } from "../../monitor-config/mod.js"

export const configHttpsMiddlewares = (server, router, apiContext) =>
  server
    .use(tracingMiddleware(apiContext.apiConfig, apiContext.getUtc))
    .use(loggingMiddleware)
    .use(exceptionHandlingMiddleware)
    .use(router.routes())
    .use(router.allowedMethods())

export const configHttpMiddlewares = (server, apiConfig) =>
  server
    .use(redirectingMiddleware(getHttpsServerBaseUrl(apiConfig)))