import { getApiTrace } from "../../../std-modules/std-tracing/mod.js"

export const createProblemExtensions = (request, extensions) => Object.freeze(
  {traceId: getApiTrace(request)?.traceId, ...extensions}
)