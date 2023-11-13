import { logInfo } from "../../../std-modules/std-logging/mod.js";
import { getApiTrace } from "../../../std-modules/std-tracing/mod.js";
import { getIdentity, isAuthenticated, setIdentity } from "../../webapi-identities/mod.js"

export const authenticatingMiddleware = (extractIdentity) => async ({request}, next) =>
{
  setIdentity(request, await extractIdentity(request.headers))

  if(isAuthenticated(request))
    logInfo("user authenticated", getIdentity(request).userName, getApiTrace(request))

  return await next()
}