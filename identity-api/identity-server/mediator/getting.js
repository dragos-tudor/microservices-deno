import { logInfo, logError } from "../../../std-modules/std-logging/mod.js";
import { createApiTrace } from "../../../std-modules/std-tracing/mod.js";
import { deleteDbMessage } from "../../identity-database/mod.js"

export const getMediatorMiddleware = (db, apiName) => async (message, next) => {
  const apiTrace = createApiTrace(apiName, message.traceId)
  try{
    logInfo(`publish ${message.messageType}`, message.messageId, apiTrace)
    await next(message)
    await deleteDbMessage(message.messageId, db)
  }
  catch(error) {
    logError(`error publish ${message.messageType}`, error, apiTrace)
  }
}