import { createApiTrace } from "../../../std-modules/std-tracing/mod.js"
import { getApiName, getServerOptions } from "../../loans-config/mod.js"
import { handleServerEvents } from "./handling.js"

export const listenServer = async (server, apiConfig, db) =>
{
  handleServerEvents(server, db, createApiTrace(getApiName(apiConfig), 0))
  await server.listen(getServerOptions(apiConfig))
  return server
}
