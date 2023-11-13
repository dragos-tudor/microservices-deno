import { assertEquals, assertObjectMatch } from "/asserts.ts"
import { getRandomID, getTestDb } from "../fixtures.js"
import { createDbAccount } from "./creating.js"
import { getDbAccount, getDbAccountByEmail } from "./getting.js"
import { insertDbAccount } from "./inserting.js"

Deno.test("querying db accounts", async (t) => {

  await t.step("existing account => get account => stored account", async () => {
    const db = await getTestDb()
    const existingAccount = createDbAccount(getRandomID(), "email", "role")
    const userName = await insertDbAccount(existingAccount, db)
    const storeAccount = await getDbAccount(userName, db)

    assertObjectMatch(storeAccount, existingAccount)
  })

  await t.step("existing account => get account by email => stored account", async () => {
    const db = await getTestDb()
    const email = getRandomID()
    const existingAccount = createDbAccount(getRandomID(), email, "role")
    await insertDbAccount(existingAccount, db)
    const storeAccount = await getDbAccountByEmail(email, db)

    assertObjectMatch(storeAccount, existingAccount)
  })

  await t.step("existing account => get some account columns => requested columns", async () => {
    const db = await getTestDb()
    const existingAccount = createDbAccount(getRandomID(), "email", "role")
    const userName = await insertDbAccount(existingAccount, db)
    const accountWithColumns = await getDbAccount(userName, db, "email", "isActive")

    assertEquals(accountWithColumns, {email: "email", isActive: 0})
  })

})