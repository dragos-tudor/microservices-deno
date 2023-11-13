import { createRateState } from "./creating.js"
import { getRateState } from "./getting.js"
import { setRateState } from "./setting.js"

export const ensureRateState = (rateStates, name) =>
  getRateState(rateStates, name) ||
  setRateState(rateStates, name, createRateState())
