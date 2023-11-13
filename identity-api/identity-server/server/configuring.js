import { Router } from "/server.ts"
import { createMediator } from "../../../std-modules/std-mediator/mod.js"
import { createJobScheduler, createJobOptions } from "../../../std-modules/std-scheduler/mod.js"
import { buildApiContext, getApiName, getSchedulerRunInterval } from "../../identity-config/mod.js"
import { configEndpoints } from "../endpoints/configuring.js"
import { createJobs } from "../jobs/creating.js"
import { getJobRunner } from "../jobs/getting.js"
import { configMiddlewares } from "../middlewares/configuring.js"
import { configMediator } from "../mediator/configuring.js"
import { getMediatorMiddleware } from "../mediator/getting.js"
import { startScheduler } from "../scheduler/starting.js"
import { configServicesFetch } from "../services/configuring.js"

export const configServer = (server, apiConfig, db, encryptionKey, signingKey) =>
{
  const schedulerOptions = createJobOptions(getSchedulerRunInterval(apiConfig))
  const scheduler = createJobScheduler(setInterval, clearInterval, Date.now, schedulerOptions)
  const mediator = createMediator([], getMediatorMiddleware(db, getApiName(apiConfig)))
  const apiContext = buildApiContext()
    .setApiConfig(apiConfig)
    .setDb(db)
    .setEncryptionKey(encryptionKey)
    .setFetch(configServicesFetch(apiConfig))
    .setGetUtc(Date.now)
    .setMediator(mediator)
    .setSigningKey(signingKey)
    .build()

  configMediator(apiContext.mediator, apiContext)
  startScheduler(scheduler, createJobs(apiContext), getJobRunner(apiConfig))
  const router = configEndpoints(new Router(), apiContext)
  return configMiddlewares(server, router, apiContext)
}
