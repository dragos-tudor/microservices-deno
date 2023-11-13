import { assertObjectMatch, assertArrayIncludes } from "/asserts.ts"
import { getRandomID, getTestDb } from "../fixtures.js"
import { createDbMessage } from "./creating.js"
import { getDbMessage, getActiveDbMessages } from "./getting.js"
import { insertDbMessage } from "./inserting.js"

Deno.test("querying db messages", async (t) => {

  await t.step("existing message => get message => stored message", async () => {
    const db = await getTestDb()
    const msg = createDbMessage(getRandomID(), "type1", "payload1")
    const msgId = await insertDbMessage(msg, db)
    const storedMessage = await getDbMessage(msgId, db)

    assertObjectMatch(msg, storedMessage)
  })

  await t.step("existing active messages => get active message => stored messages", async () => {
    const db = await getTestDb()
    const activated = 1
    const msgId1 = await insertDbMessage(createDbMessage(getRandomID(), "type1", "", null, null, activated), db)
    const msgId2 = await insertDbMessage(createDbMessage(getRandomID(), "type2", "", null, null, activated), db)
    await insertDbMessage(createDbMessage(getRandomID(), "type3", "", Date.now(), 0), db)
    const storedMessages = await getActiveDbMessages(10, db)

    assertArrayIncludes(storedMessages.map(o => o.messageId), [msgId1, msgId2])
  })

})