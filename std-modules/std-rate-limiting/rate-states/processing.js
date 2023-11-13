import { getRateStateStartDate } from "./getting.js"
import { resetRateState } from "./resetting.js"
import { setRateStateCounter, setRateStateStartDate } from "./setting.js"
import { suspendRateState } from "./suspending.js"
import { isOverIntervalRateState, isOverLimitRateStateCounter, isOverSuspendedRateState } from "./verifying.js"

// mutate rate state [avoid new allocations]
export const processRateState = (rateState, rateLimits, currentDate) => {
  getRateStateStartDate(rateState) || setRateStateStartDate(rateState, currentDate)
  setRateStateCounter(rateState, rateState.requestsCounter + 1)

  if(isOverSuspendedRateState(rateState, currentDate)) return resetRateState(rateState, currentDate)
  if(isOverLimitRateStateCounter(rateState, rateLimits)) return suspendRateState(rateState, rateLimits, currentDate)
  if(isOverIntervalRateState(rateState, rateLimits, currentDate)) return resetRateState(rateState, currentDate)

  return rateState
}