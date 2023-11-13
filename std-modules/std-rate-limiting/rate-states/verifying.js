
export const isOverIntervalRateState = (rateState, rateLimits, currentDate) =>
  (currentDate - rateState.startDate) > rateLimits.requestsInterval

export const isOverLimitRateStateCounter = (rateState, rateLimits) =>
  rateState.requestsCounter > rateLimits.requestsLimit

export const isOverSuspendedRateState = (rateState, currentDate) =>
  rateState.suspendedUntil? rateState.suspendedUntil < currentDate: false

export const isRateStateSuspended = (rateState) => !!rateState.suspendedUntil