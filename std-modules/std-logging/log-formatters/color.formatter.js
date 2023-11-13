import { toColoredLogLevelString } from "../log-levels/converting.js"

export const colorFormatter = (logLevel, message, currentDate = new Date()) =>
  `[${toColoredLogLevelString(logLevel)}] [${currentDate.toISOString()}] [${message}]`