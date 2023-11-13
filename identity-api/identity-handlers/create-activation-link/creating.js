import { createDbActivationLink, createDbMessage, generateId, getDbMessageByType, insertDbActivationLink, insertDbMessage } from "../../identity-database/mod.js"
import { getActivationLinkExpiresAfter } from "../../identity-config/mod.js"
import { createActivationLinkCreatedEvent, deserializeEvent, serializeEvent, EventTypes } from "../../identity-domain/mod.js"

export const createActivationLink = async (accountRegistered, apiContext) =>
{
  const {apiConfig, db, getUtc, mediator} = apiContext
  const {messageId, payload, traceId} = accountRegistered
  if(await getDbMessageByType(EventTypes.activationLinkCreated, messageId, db)) return

  const accountCreatedEvent = deserializeEvent(payload)
  const activationLinkExpiresAfter = getActivationLinkExpiresAfter(apiConfig) * 1000
  const activationLink = createDbActivationLink(generateId(), accountCreatedEvent.userName, getUtc() + activationLinkExpiresAfter)

  const activationLinkCreated = createActivationLinkCreatedEvent(activationLink.activationLinkId, accountCreatedEvent.email, activationLink.expiresAt)
  const activationLinkCreatedMessage = createDbMessage(generateId(), activationLinkCreated.eventType, serializeEvent(activationLinkCreated), messageId, traceId, getUtc())

  await db.transaction(async () => {
    await insertDbActivationLink(activationLink, db)
    await insertDbMessage(activationLinkCreatedMessage, db)
  })

  mediator.publish(activationLinkCreatedMessage)
  return activationLink.activationLinkId
}