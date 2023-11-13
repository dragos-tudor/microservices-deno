import { assertEquals } from "/asserts.ts"
import { getTestDb } from "../fixtures.js"
import { createDbNotification } from "./creating.js"
import { getDbNotification } from "./getting.js"
import { insertDbNotification } from "./inserting.js"

Deno.test("querying db notifications", async (t) => {

  await t.step("existing notification => get notification => stored notification", async () => {
    const db = await getTestDb()
    const notification = createDbNotification("1", "email", "emailContext")
    await insertDbNotification(notification, db)
    const storedNotification = await getDbNotification("1", db)

    assertEquals(storedNotification, notification)
  })

})