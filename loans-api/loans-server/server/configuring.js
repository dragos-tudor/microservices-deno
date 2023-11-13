import { Router } from "/server.ts"
import { buildApiContext } from "../../loans-config/mod.js"
import { configEndpoints } from "../endpoints/configuring.js"
import { configMiddlewares } from "../middlewares/configuring.js"

export const configServer = (server, apiConfig, db, encryptionKey) =>
{
  const apiContext = buildApiContext()
    .setApiConfig(apiConfig)
    .setCache({interests: {}, discounts: {}})
    .setDb(db)
    .setEncryptionKey(encryptionKey)
    .setGetUtc(Date.now)
    .build()

  const router = configEndpoints(new Router(), apiContext)
  return configMiddlewares(server, router, apiContext)
}
