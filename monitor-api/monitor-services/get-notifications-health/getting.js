import { isError } from "../../../std-modules/std-errors/mod.js";
import { createHeaders, createHeader, HeaderNames } from "../../../webapi-modules/webapi-headers/mod.js"
import { getNotificationsHealthUrl } from "../../monitor-config/mod.js"

export const getNotificationsHealthv1 = async (apiContext, apiTrace) =>
{
  const {apiConfig, fetch} = apiContext
  const headers = createHeaders(
    createHeader(HeaderNames.requestedFrom, apiTrace.apiName),
    createHeader(HeaderNames.traceId, apiTrace.traceId)
  )

  const response = await fetch(getNotificationsHealthUrl(apiConfig), { method: "GET", headers })
  return !isError(response)
}