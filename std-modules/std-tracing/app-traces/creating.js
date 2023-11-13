import { generateTraceId } from "./generating.js"

export const createApiTrace = (apiName, traceId = generateTraceId(), requestedFrom = undefined) =>
  requestedFrom?
    Object.freeze({apiName, traceId, requestedFrom}):
    Object.freeze({apiName, traceId})