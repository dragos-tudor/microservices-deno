import { LogLevels } from "../log-levels/log.levels.js"
import { consoleLogger } from "../loggers/console.logger.js"
import { colorFormatter } from "../log-formatters/color.formatter.js"
import { createLogConfig } from "./creating.js"

export let logConfig = createLogConfig(LogLevels.info, consoleLogger, colorFormatter)

export const setLogConfig = (minimumLevel, logger = consoleLogger, formatter = colorFormatter) =>
  logConfig = createLogConfig(minimumLevel, logger, formatter)