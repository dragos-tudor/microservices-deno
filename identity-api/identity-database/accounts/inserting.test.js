import { assertEquals } from "/asserts.ts"
import { getRandomID, getTestDb } from "../fixtures.js"
import { createDbAccount } from "./creating.js"
import { insertDbAccount } from "./inserting.js"

Deno.test("querying db accounts", async (t) => {

  await t.step("new account => insert account => stored account name", async () => {
    const db = await getTestDb()
    const newAccount = createDbAccount(getRandomID(), "email", "role")
    const storedAccountName = await insertDbAccount(newAccount, db)

    assertEquals(storedAccountName, newAccount.userName)
  })

})