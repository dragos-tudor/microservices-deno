import { assertEquals, assertArrayIncludes } from "/asserts.ts"
import { getTestDb } from "../fixtures.js"
import { createDbRole } from "./creating.js"
import { getDbRole, getDbRoles } from "./getting.js"
import { insertDbRole } from "./inserting.js"

Deno.test("querying db roles", async (t) => {

  await t.step("existing role => get role => stored role", async () => {
    const db = await getTestDb()
    const existingRole = createDbRole("role")
    await insertDbRole(existingRole, db)
    const storedRole = await getDbRole(existingRole.roleName, db)

    assertEquals(storedRole, existingRole)
  })

  await t.step("existing roles => get roles => stored roles", async () => {
    const db = await getTestDb()
    const existingRole1 = createDbRole("role1")
    const existingRole2 = createDbRole("role2")
    await insertDbRole(existingRole1, db)
    await insertDbRole(existingRole2, db)
    const storedRoles = await getDbRoles(db)

    assertArrayIncludes(storedRoles, [existingRole1, existingRole2])
  })

})