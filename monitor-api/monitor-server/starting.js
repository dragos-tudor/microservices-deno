import { Application, Router } from "/server.ts"
import { createApiTrace } from "../../std-modules/std-tracing/mod.js"
import { buildApiContext, getApiName, getHttpServerOptions, getHttpsServerOptions } from "../monitor-config/mod.js"
import { configEndpoints } from "./endpoints/configuring.js"
import { configHttpMiddlewares, configHttpsMiddlewares } from "./middlewares/configuring.js"
import { configServicesFetch } from "./services/configuring.js"
import { listenServerEvents } from "./server/listening.js"

export const startHttpServer = async (apiConfig) =>
{
  const server = configHttpMiddlewares(new Application(), apiConfig)

  listenServerEvents(server, createApiTrace(getApiName(apiConfig), 0))
  await server.listen(getHttpServerOptions(apiConfig))
  return server
}

export const startHttpsServer = async (apiConfig) =>
{
  const apiContext = buildApiContext()
    .setApiConfig(apiConfig)
    .setGetUtc(Date.now)
    .setFetch(configServicesFetch(apiConfig))
    .build()
  const router = configEndpoints(new Router(), apiContext)
  const server = configHttpsMiddlewares(new Application(), router, apiContext)

  listenServerEvents(server, createApiTrace(getApiName(apiConfig), 0))
  await server.listen(getHttpsServerOptions(apiConfig))
  return server
}
