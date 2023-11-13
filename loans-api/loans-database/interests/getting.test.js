import { assertEquals } from "/asserts.ts"
import { getTestDb } from "../fixtures.js"
import { createDbInterest } from "./creating.js"
import { getDbInterest } from "./getting.js"
import { insertDbInterest } from "./inserting.js"

Deno.test("querying loans database", async (t) => {

  await t.step("inserted loan interest => get loan interest => stored loan interest", async () => {
    const db = getTestDb()

    const interest = createDbInterest(crypto.randomUUID(), 1.25)
    const loanType = await insertDbInterest(interest, db)
    const actual = await getDbInterest(loanType, db)

    assertEquals(actual, interest)
  })

})