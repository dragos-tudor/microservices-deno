import { assertObjectMatch } from "/asserts.ts"
import { getRandomID, getTestDb } from "../fixtures.js"
import { createDbAccount } from "./creating.js"
import { insertDbAccount } from "./inserting.js"
import { updateDbAccountPassword } from "./updating.js"
import { getDbAccount } from "./getting.js";

Deno.test("querying db accounts", async (t) => {

  await t.step("new passwords => update account => stored new passwords", async () => {
    const db = await getTestDb()
    const account = createDbAccount(getRandomID(), "email", "role")
    await insertDbAccount(account, db)
    await updateDbAccountPassword(account.userName, "password", "salt", db)
    const storedAccount = await getDbAccount(account.userName, db)

    assertObjectMatch(storedAccount, {password: "password", passwordSalt: "salt"})
  })

})