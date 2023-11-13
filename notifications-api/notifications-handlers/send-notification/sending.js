import { logInfo } from "../../../std-modules/std-logging/mod.js";
import { createApiTrace } from "../../../std-modules/std-tracing/mod.js";
import { getApiName } from "../../notifications-config/mod.js";
import { createDbMessage, generateId, getDbMessageByType, insertDbMessage } from "../../notifications-database/mod.js"
import { deserializeEvent, EventTypes } from "../../notifications-domain/mod.js"

export const sendNotificationv1 = async (notificationRegistered, apiContext) =>
{
  const {apiConfig, db, getUtc} = apiContext
  const {messageId, payload, traceId} = notificationRegistered
  if(await getDbMessageByType(EventTypes.notificationSent, messageId, db)) return

  const {emailContent} = deserializeEvent(payload)
  logInfo("notification sent", emailContent, createApiTrace(getApiName(apiConfig), traceId)) //simulate send to external services

  const notificationSent = createDbMessage(generateId(), EventTypes.notificationSent, "", messageId, traceId, getUtc(), 0)
  await insertDbMessage(notificationSent, db)
  return notificationSent
}