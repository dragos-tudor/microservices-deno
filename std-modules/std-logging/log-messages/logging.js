import { getLogConfig } from "../log-configs/getting.js"
import { LogLevels } from "../log-levels/log.levels.js"
import { isLogEnabled } from "../log-levels/verifying.js"

const logMessage = (logLevel) => (message, params, apiTrace = {}, logConfig = getLogConfig()) =>
  isLogEnabled(logConfig, logLevel) && logConfig.logger(logConfig.formatter(logLevel, message), params, apiTrace)

export const logTrace = logMessage(LogLevels.trace)

export const logDebug = logMessage(LogLevels.debug)

export const logInfo = logMessage(LogLevels.info)

export const logWarning = logMessage(LogLevels.warning)

export const logError = logMessage(LogLevels.error)

