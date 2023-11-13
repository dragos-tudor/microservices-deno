import { logInfo, logError } from "../../../std-modules/std-logging/mod.js";
import { getApiTrace } from "../../../std-modules/std-tracing/mod.js";
import { getRequestUrl } from "../../webapi-requests/mod.js";
import { isErrorResponse, isServerErrorResponse } from "../../webapi-responses/mod.js";

export const loggingMiddleware = async ({request, response}, next) =>
{
  const apiTrace = getApiTrace(request)
  const requestUrl = getRequestUrl(request)

  logInfo(requestUrl, "", apiTrace)
  await next()

  if(!isErrorResponse(response) || isServerErrorResponse(response))
    return response

  logError(requestUrl, {request, response}, apiTrace)
  return response
}