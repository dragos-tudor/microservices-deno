import { logError, logInfo } from "../../../std-modules/std-logging/mod.js";
import { runJob } from "../../../std-modules/std-scheduler/mod.js"
import { createApiTrace } from "../../../std-modules/std-tracing/mod.js";
import { getApiName } from "../../identity-config/mod.js"

export const getJobRunner = (apiConfig) => async (job, getUtc) =>
{
  const apiTrace = createApiTrace(getApiName(apiConfig))
  logInfo(`run job ${job[0].name}`, job[1], apiTrace)

  try { await runJob(job, getUtc) }
  catch(error) { logError(`run job error`, error, apiTrace) }
}