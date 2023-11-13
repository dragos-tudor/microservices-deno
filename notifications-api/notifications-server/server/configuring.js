import { Router } from "/server.ts"
import { createMediator } from "../../../std-modules/std-mediator/mod.js"
import { buildApiContext, getApiName } from "../../notifications-config/mod.js"
import { configEndpoints } from "../endpoints/configuring.js"
import { configMiddlewares } from "../middlewares/configuring.js"
import { configMediator } from "../mediator/configuring.js"
import { getMediatorMiddleware } from "../mediator/getting.js"

export const configServer = (server, apiConfig, db, signingKey) =>
{
  const mediator = createMediator([], getMediatorMiddleware(db, getApiName(apiConfig)))
  const apiContext = buildApiContext()
    .setApiConfig(apiConfig)
    .setDb(db)
    .setGetUtc(Date.now)
    .setMediator(mediator)
    .setSigningKey(signingKey)
    .build()

  configMediator(apiContext.mediator, apiContext)
  const router = configEndpoints(new Router(), apiContext)
  return configMiddlewares(server, router, apiContext)
}
