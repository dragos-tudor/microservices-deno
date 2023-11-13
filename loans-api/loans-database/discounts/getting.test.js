import { assertEquals } from "/asserts.ts"
import { getTestDb } from "../fixtures.js"
import { createDbDiscount } from "./creating.js"
import { getDbDiscount } from "./getting.js"
import { insertDbDiscount } from "./inserting.js"

Deno.test("querying loans database", async (t) => {

  await t.step("inserted loan discount => get loan discount => stored loan discount", async () => {
    const db = getTestDb()

    const discount = createDbDiscount(crypto.randomUUID(), 0.20)
    const discountType = await insertDbDiscount(discount, db)
    const actual = await getDbDiscount(discountType, db)

    assertEquals(actual, discount)
  })

})