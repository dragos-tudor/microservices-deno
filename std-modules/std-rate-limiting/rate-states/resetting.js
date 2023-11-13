import { createRateState } from "./creating.js"

export const resetRateState = (rateState, currentDate) => Object.assign(rateState, createRateState(1, currentDate))