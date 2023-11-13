import { getLogLevelColor } from "./getting.js"
import { LogLevels } from "./log.levels.js"

export const toColoredLogLevelString = (logLevel) =>
  getLogLevelColor(logLevel)(toLogLevelString(logLevel))

export const toLogLevelString = (logLevel) => {
  switch(logLevel) {
    case LogLevels.trace: return "trace"
    case LogLevels.debug: return "debug"
    case LogLevels.info: return "info"
    case LogLevels.warning: return "warning"
    case LogLevels.error: return "error"
  }
}