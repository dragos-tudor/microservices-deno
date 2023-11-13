import { gray, green, yellow, red } from "/colors.ts"
import { LogLevels } from "./log.levels.js"

export const getLogLevelColor = (logLevel) => {
  switch(logLevel) {
    case LogLevels.trace: return gray
    case LogLevels.debug: return gray
    case LogLevels.info: return green
    case LogLevels.warning: return yellow
    case LogLevels.error: return red
  }
}