import { createApiTrace } from "../../std-modules/std-tracing/mod.js"
import { getApiName, getServerOptions } from "../notifications-config/mod.js"
import { listenServerEvents } from "./server/listening.js"

export const listenServer = async (server, apiConfig, db) =>
{
  listenServerEvents(server, db, createApiTrace(getApiName(apiConfig), 0))
  await server.listen(getServerOptions(apiConfig))
  return server
}
