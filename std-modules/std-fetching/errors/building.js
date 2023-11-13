import { createError } from "../../std-errors/mod.js"

export const createAbortError = (error, url) =>
  createError(`abort error [${url}]`, Deno.errors.ConnectionAborted, error.stack)

export const createFetchError = (message, url) =>
  createError(`${message} [${url}]`, Error)

export const createNetworkError = (error, url) =>
  createError(`network unreachable [${url}]`, Deno.errors.NetworkUnreachable, error.stack)

export const createTimeoutError = (error, url) =>
  createError(`timeout error [${url}]`, Deno.errors.TimedOut, error.stack)

