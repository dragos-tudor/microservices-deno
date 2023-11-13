import { assertEquals, assertObjectMatch } from "/asserts.ts"
import { getTestDb } from "../fixtures.js"
import { buildApiContext } from "../../identity-config/mod.js"
import { createAccountRegisteredEvent, deserializeEvent, EventTypes, serializeEvent } from "../../identity-domain/mod.js"
import { createDbMessage, generateId, getDbActivationLink } from "../../identity-database/mod.js"
import { createActivationLink } from "./creating.js"

Deno.test("use handlers", async (t) => {

  const db = await getTestDb()
  const _ = () => {}

  await t.step("account registered message => create activation link => activation link created", async () => {
    const event = createAccountRegisteredEvent("user", "email")
    const message = createDbMessage(generateId(), EventTypes.accountRegistered, serializeEvent(event))
    const apiContext = buildApiContext()
      .setApiConfig({activationLinks: {expiresAfter: 300}})
      .setDb(db)
      .setMediator({publish: _})
      .setGetUtc(() => 10000)
      .build()
    const activationLinkId = await createActivationLink(message, apiContext)
    const {userName, expiresAt} = await getDbActivationLink(activationLinkId, db)

    assertEquals(userName, "user")
    assertEquals(expiresAt, 310000)
  })

  await t.step("account registered message => create activation link => publish activation link created message", async () => {
    const event = createAccountRegisteredEvent("user", "email")
    const message = createDbMessage(generateId(), EventTypes.accountRegistered, serializeEvent(event))
    const apiContext = buildApiContext()
      .setApiConfig({})
      .setDb(db)
      .setMediator({publish: (message) => {
        assertEquals(message.messageType, EventTypes.activationLinkCreated)
        assertObjectMatch(deserializeEvent(message.payload), {eventType: EventTypes.activationLinkCreated, email: "email"})
      }})
      .setGetUtc()
      .build()
    await createActivationLink(message, apiContext)
  })

  await t.step("account registered message already handled => create activation link => nothing happend [idempotency]", async () => {
    const event = createAccountRegisteredEvent("user", "email")
    const message = createDbMessage(generateId(), EventTypes.accountRegistered, serializeEvent(event))
    const apiContext = buildApiContext()
      .setApiConfig({})
      .setDb(db)
      .setMediator({publish: _})
      .setGetUtc()
      .build()
    await createActivationLink(message, apiContext)
    const result = await createActivationLink(message, apiContext)

    assertEquals(result, undefined)
  })

})
