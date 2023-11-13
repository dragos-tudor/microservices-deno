import { assertEquals } from "/asserts.ts"
import { getRandomID, getTestDb } from "../fixtures.js"
import { createDbActivationLink } from "./creating.js"
import { getDbActivationLink } from "./getting.js"
import { insertDbActivationLink } from "./inserting.js"

Deno.test("querying db activation links", async (t) => {

  await t.step("existing activation link => get activation link => stored activation link", async () => {
    const db = await getTestDb()
    const activationLink = createDbActivationLink(getRandomID(), "account", 0)
    const activationLinkId = await insertDbActivationLink(activationLink, db)
    const storedActivationLink = await getDbActivationLink(activationLinkId, db)

    assertEquals(storedActivationLink, activationLink)
  })

})