import { createApiTrace, generateTraceId, setApiTrace } from "../../../std-modules/std-tracing/mod.js"
import { createHeader, getHeader, setHeader, HeaderNames } from "../../webapi-headers/mod.js"

export const tracingMiddleware = (apiConfig, getUtc) => async ({request, response}, next) =>
{
  const traceId = getHeader(request.headers, HeaderNames.traceId) || generateTraceId()
  const requestedFrom = getHeader(request.headers, HeaderNames.requestedFrom)
  const apiTrace = createApiTrace(apiConfig.apiName, traceId, requestedFrom)
  setApiTrace(request, apiTrace)

  const startDate = getUtc()
  await next()
  const responseTime = getUtc() - startDate

  setHeader(response.headers, createHeader(HeaderNames.responseTime, responseTime))
  return response
}