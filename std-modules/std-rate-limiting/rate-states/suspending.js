
const getSuspendedUntil = (rateLimits, currentDate) => rateLimits.suspendInterval + currentDate

export const suspendRateState = (rateState, rateLimits, currentDate) =>
  Object.assign(rateState, {suspendedUntil: getSuspendedUntil(rateLimits, currentDate)})