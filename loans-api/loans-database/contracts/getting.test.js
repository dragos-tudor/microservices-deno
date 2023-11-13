import { assertEquals } from "/asserts.ts"
import { getTestDb } from "../fixtures.js"
import { createDbContract } from "./creating.js"
import { getDbContract } from "./getting.js"
import { insertDbContract } from "./inserting.js"

Deno.test("querying loans database", async (t) => {

  await t.step("inserted contract => get contract => stored contract", async () => {
    const db = getTestDb()

    const contract = createDbContract(crypto.randomUUID(), "user", 200, 40)
    const contractId = await insertDbContract(contract, db)
    const actual = await getDbContract(contractId, db)

    assertEquals(actual, contract)
  })

})