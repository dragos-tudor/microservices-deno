import { ensureRateState, isRateStateSuspended, processRateState } from "../../../std-modules/std-rate-limiting/mod.js"
import { createProblemDetails } from "../../webapi-problems/mod.js"
import { setResponseJsonError } from "../../webapi-responses/mod.js"
import { getClientIp } from "./getting.js"

export const globalRateLimitingMiddleware = (rateLimits, rateState, getUtc) => async ({request, response}, next) =>
  isRateStateSuspended(processRateState(rateState, rateLimits, getUtc()))?
    setResponseJsonError(response, createProblemDetails(request, null, 503)):
    await next()

export const ipRateLimitingMiddleware = (rateLimits, rateState, getUtc) => async ({request, response}, next) =>
  isRateStateSuspended(processRateState(rateState, rateLimits, getUtc()))?
    setResponseJsonError(response, createProblemDetails(request, null, 429)):
    await next()

export const rateLimitingMiddleware = (rateLimits, rateStates, getUtc = Date.now) => (context, next) =>
  globalRateLimitingMiddleware(rateLimits.global, ensureRateState(rateStates, "global"), getUtc)
    (context, () => ipRateLimitingMiddleware(rateLimits.ip, ensureRateState(rateStates, getClientIp(context)), getUtc) (context, next))