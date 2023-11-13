
export const setRateState = (rateStates, name, rateState) => rateStates[name] = rateState

export const setRateStateCounter = (rateState, counter) => rateState.requestsCounter = counter

export const setRateStateStartDate = (rateState, startDate) => rateState.startDate = startDate