import { assertEquals } from "/asserts.ts"
import { getCacheData } from "./getting.js"
import { setCacheData } from "./setting.js"
import { createCacheOptions } from "../cache-options/creating.js"

Deno.test("caching data", async (t) => {

  await t.step("non-expired cached data => get cache data => cached data", () => {
    const cache = {}
    const nonExpiredCacheDate = 5
    setCacheData(cache, "key", "data", createCacheOptions(10))

    assertEquals(getCacheData(cache, "key", nonExpiredCacheDate), "data")
  })

  await t.step("expired cache date => get cache data => nothing", () => {
    const cache = {}
    const expiredCacheDate = 15
    setCacheData(cache, "key", undefined, createCacheOptions(10))

    assertEquals(getCacheData(cache, "key", expiredCacheDate), undefined)
  })

})
