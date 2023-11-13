import { createApiTrace } from "../../../std-modules/std-tracing/mod.js"
import { isError } from "../../../std-modules/std-errors/mod.js"
import { createDbMessage, generateId, getDbMessageByType, insertDbMessage } from "../../identity-database/mod.js"
import { getActivationLinkUrl, getApiName } from "../../identity-config/mod.js"
import { deserializeEvent, EventTypes } from "../../identity-domain/mod.js"
import { registerNotificationv1 } from "../../identity-services/mod.js"
import { formatEmailContent } from "./formatting.js"
import { createRegisterNotificationDto } from "./creating.js"

export const sendActivationLink = async (activationLinkCreated, apiContext, registerNotification = registerNotificationv1) =>
{
  const {apiConfig, db, getUtc} = apiContext
  const {messageId, payload, traceId} = activationLinkCreated
  if(await getDbMessageByType(EventTypes.activationLinkSent, messageId, db)) return

  const {activationLinkId, email, expiresAt} = deserializeEvent(payload)
  const emailContent = formatEmailContent(getActivationLinkUrl(apiConfig), activationLinkId, expiresAt)
  const registerNotificationDto = createRegisterNotificationDto(activationLinkId, email, emailContent)

  const result = await registerNotification(registerNotificationDto, apiContext, createApiTrace(getApiName(apiConfig), traceId))
  if(isError(result)) return Promise.reject(result)

  const activationLinkSent = createDbMessage(generateId(), EventTypes.activationLinkSent, "", messageId, traceId, getUtc())
  await insertDbMessage(activationLinkSent, db)
  return activationLinkSent.messageId
}