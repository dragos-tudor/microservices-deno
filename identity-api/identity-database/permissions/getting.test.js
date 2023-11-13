import { assertEquals } from "/asserts.ts"
import { getTestDb } from "../fixtures.js"
import { createDbPermission } from "./creating.js"
import { getDbPermission } from "./getting.js"
import { insertDbPermission } from "./inserting.js"

Deno.test("querying db permissions", async (t) => {

  await t.step("existing permission => get permission by role => stored permission", async () => {
    const db = await getTestDb()
    const permission = createDbPermission(1, "role")
    await insertDbPermission(permission, db)
    const storedPermission = await getDbPermission(1, "role", db)

    assertEquals(storedPermission, permission)
  })

})