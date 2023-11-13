import { getApiTrace } from "../../../std-modules/std-tracing/mod.js"
import { createProblemDetails } from "../../../webapi-modules/webapi-problems/mod.js"
import { setResponseJsonError, setResponseJson } from "../../../webapi-modules/webapi-responses/mod.js"
import { getIdentityHealthv1, getLoansHealthv1, getNotificationsHealthv1 } from "../../monitor-services/mod.js"
import { createHealthResultDto } from "./creating.js"

export const getHealthv1 = async (request, response, apiContext) =>
{
  const identityHealth = await getIdentityHealthv1(apiContext, getApiTrace(request))
  const loansHealth = await getLoansHealthv1(apiContext, getApiTrace(request))
  const notificationsHealth = await getNotificationsHealthv1(apiContext, getApiTrace(request))

  const healthDto = createHealthResultDto(identityHealth, loansHealth, notificationsHealth)
  return identityHealth && loansHealth && notificationsHealth?
    setResponseJson(response, healthDto):
    setResponseJsonError(response, createProblemDetails(request, "unhealth services", 500, healthDto))
}