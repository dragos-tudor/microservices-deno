import { assertEquals } from "/asserts.ts"
import { getRandomID, getTestDb } from "../fixtures.js"
import { createDbMessage } from "./creating.js"
import { getDbMessage } from "./getting.js"
import { insertDbMessage } from "./inserting.js"
import { deleteDbMessage } from "./deleting.js"

Deno.test("querying db messages", async (t) => {

  await t.step("existing message => delete message => inactive message", async () => {
    const db = await getTestDb()
    const message = createDbMessage(getRandomID(), "type", "payload")
    const messageId = await insertDbMessage(message, db)
    await deleteDbMessage(messageId, db)
    const storedMessage = await getDbMessage(messageId, db)

    assertEquals(storedMessage.isActive, 0)
  })

})