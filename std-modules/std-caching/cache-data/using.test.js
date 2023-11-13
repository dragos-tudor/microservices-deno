import { assertEquals } from "/asserts.ts"
import { assertSpyCalls, spy } from "/mock.ts"
import { useCacheData } from "./using.js"

Deno.test("caching data", async (t) => {

  await t.step("non-cached data => using cache data => cached data", async () => {
    const cache = {}
    const getCacheData = () => Promise.resolve("data")

    const actual = await useCacheData(cache, "key", getCacheData)

    assertEquals(actual, "data")
  })

  await t.step("already cached data => use cache data => cached data", async () => {
    const cache = {}
    const getCacheData = () => Promise.resolve("data")
    await useCacheData(cache, "key", getCacheData)
    const actual = await useCacheData(cache, "key", getCacheData)

    assertEquals(actual, "data")
  })

  await t.step("already cached data => use cache data => get cache data func called once", async () => {
    const cache = {}
    const getCacheDataSpy = spy(() => Promise.resolve("data"))
    await useCacheData(cache, "key", getCacheDataSpy)
    await useCacheData(cache, "key", getCacheDataSpy)

    assertSpyCalls(getCacheDataSpy, 1)
  })

  await t.step("non-expired cached data => use cache data => cached data", async () => {
    const cache = {}
    const nonExpiredCacheDate = 5
    const expiresAtDate = 10
    const getCacheData = () => Promise.resolve("data")
    await useCacheData(cache, "key", getCacheData, expiresAtDate)
    const actual = await useCacheData(cache, "key", getCacheData, expiresAtDate, nonExpiredCacheDate)

    assertEquals(actual, "data")
  })

  await t.step("expired cached data => use cache data => cached data", async () => {
    const cache = {}
    const expiredCacheDate = 15
    const expiresAtDate = 10
    const getCacheData = () => Promise.resolve("data")
    await useCacheData(cache, "key", getCacheData, expiresAtDate)
    const actual = await useCacheData(cache, "key", getCacheData, expiresAtDate, expiredCacheDate)

    assertEquals(actual, "data")
  })

})
