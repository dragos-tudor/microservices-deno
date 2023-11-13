import { assertEquals } from "/asserts.ts"
import { getCacheData } from "./getting.js"
import { setCacheData } from "./setting.js"

Deno.test("caching data", async (t) => {

  await t.step("non-cached data => set cache data => cached data", () => {
    const cacheData = {x: 1}
    const cache = {}
    setCacheData(cache, "key", cacheData)

    assertEquals(getCacheData(cache, "key"), cacheData)
  })

})
