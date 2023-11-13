import { createAccountRegisteredEvent, serializeEvent } from "../../identity-domain/mod.js"
import { createDbAccount, createDbMessage, generateId, insertDbAccount, insertDbMessage, transactDb } from "../../identity-database/mod.js"

export const insertAccount = async (registerDto, db, mediator, traceId) =>
{
  const account = createDbAccount(registerDto.userName, registerDto.email, registerDto.role)
  const event = createAccountRegisteredEvent(account.userName, account.email)
  const message = createDbMessage(generateId(), event.eventType, serializeEvent(event), null, traceId)

  const results =  await transactDb(() => [
    insertDbAccount(account, db),
    insertDbMessage(message, db)
  ], db)

  mediator.publish(message)
  return results[0]
}