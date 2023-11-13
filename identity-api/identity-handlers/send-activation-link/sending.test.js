import { assertEquals, assertFalse, assertRejects } from "/asserts.ts"
import { getTestDb } from "../fixtures.js"
import { buildApiContext } from "../../identity-config/mod.js"
import { createActivationLinkCreatedEvent, EventTypes, serializeEvent } from "../../identity-domain/mod.js"
import { createDbMessage, generateId, getDbMessage } from "../../identity-database/mod.js"
import { sendActivationLink } from "./sending.js"

Deno.test("use handlers", async (t) => {

  const db = await getTestDb()
  const _ = () => []

  await t.step("activation link created => send activation link => activation link sent", async () => {
    const event = createActivationLinkCreatedEvent(generateId(), "email", Date.now())
    const message = createDbMessage(generateId(), EventTypes.activationLinkCreated, serializeEvent(event))
    const apiContext = buildApiContext()
      .setApiConfig({})
      .setDb(db)
      .setGetUtc()
      .build()
    const messageId = await sendActivationLink(message, apiContext, _)
    const {messageType} = await getDbMessage(messageId, db)

    assertEquals(messageType, EventTypes.activationLinkSent)
  })

  await t.step("activation link created => send activation link => notification service receive email and activation link id", async () => {
    const event = createActivationLinkCreatedEvent(generateId(), "email", Date.now())
    const message = createDbMessage(generateId(), EventTypes.activationLinkCreated, serializeEvent(event))
    const apiContext = buildApiContext()
      .setApiConfig({})
      .setDb(db)
      .setGetUtc()
      .build()
    await sendActivationLink(message, apiContext, ({notificationId, email}) => {
      assertEquals(email, "email")
      assertEquals(notificationId, event.activationLinkId)
    })
  })

  await t.step("existing activation link sent => send activation link => nothing happend [idempotency]", async () => {
    const event = createActivationLinkCreatedEvent(generateId(), "email", Date.now())
    const message = createDbMessage(generateId(), EventTypes.activationLinkCreated, serializeEvent(event))
    const apiContext = buildApiContext()
      .setApiConfig({})
      .setDb(db)
      .setGetUtc()
      .build()
    await sendActivationLink(message, apiContext, _)
    const result = await sendActivationLink(message, apiContext, _)

    assertEquals(result, undefined)
  })

  await t.step("first call notification service return error => send again activation link => activation link sent", async () => {
    const event = createActivationLinkCreatedEvent(generateId(), "email", Date.now())
    const message = createDbMessage(generateId(), EventTypes.activationLinkCreated, serializeEvent(event))
    const apiContext = buildApiContext()
      .setApiConfig({})
      .setDb(db)
      .setGetUtc()
      .build()

    await assertRejects(() => sendActivationLink(message, apiContext, () => new Error()), Error)
    const messageId = await sendActivationLink(message, apiContext, _)
    const {messageType} = await getDbMessage(messageId, db)

    assertEquals(messageType, EventTypes.activationLinkSent)
  })



})