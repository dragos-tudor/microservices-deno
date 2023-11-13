import { toLogLevelString } from "../log-levels/converting.js"

export const simpleFormatter = (level, message, currentDate = new Date()) =>
  `[${toLogLevelString(level)}] [${currentDate.toISOString()}] [${message}]`