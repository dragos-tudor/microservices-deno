import { logInfo, logError } from "../../../std-modules/std-logging/mod.js"

const UncaughtApplicationError = "uncaught application error"

const getHttpProtocol = (secure) => secure? "https://": "http://"

export const logServerErrorEvent = (apiTrace) => ({error}) =>
  logError(UncaughtApplicationError, error, apiTrace)

export const logServerListenEvent = (apiTrace) => ({hostname, port, secure}) =>
  logInfo(`start listening on: ${getHttpProtocol(secure)}${hostname}:${port}`, null, apiTrace)

