import { getErrorName } from "../../std-errors/mod.js"
import { createAbortError, createFetchError, createNetworkError, createTimeoutError } from "./building.js"

const identityError = (error) => error

const FetchErrors = Object.freeze({
  "Error": identityError,
  "AbortError": createAbortError,
  "TypeError": createNetworkError,
  "TimeoutError": createTimeoutError,
  "string": createFetchError
})

export const toFetchError = (error, url) =>
  (FetchErrors[getErrorName(error)] || FetchErrors["Error"])(error, url)