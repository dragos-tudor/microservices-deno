import { logError } from "../../../std-modules/std-logging/mod.js"
import { getApiTrace } from "../../../std-modules/std-tracing/mod.js"
import { createProblemDetails } from "../../webapi-problems/mod.js"
import { setResponseJsonError } from "../../webapi-responses/mod.js"

export const exceptionHandlingMiddleware = async ({request, response}, next) => {
  try {
    return await next()
  }
  catch(ex) {
    logError(request.url.toString(), ex, getApiTrace(request))
    return setResponseJsonError(response, createProblemDetails(request, "", 500))
  }
}