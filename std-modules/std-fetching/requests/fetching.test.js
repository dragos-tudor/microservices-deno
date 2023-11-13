import { assertEquals, assertIsError } from "/asserts.ts"
import { fetchData } from "./fetching.js"

Deno.test("fetching data", async (t) => {

  await t.step("server data => fetch data => data response", async () => {
    const serverData = 1
    const data = await fetchData("url", {}, () => Promise.resolve(serverData))
    assertEquals(data, serverData)
  })

  await t.step("non-existing url => fetch data => network error", async () => {
    const error = await fetchData("http://non-existing", {method: "GET"}, fetch)
    assertIsError(error, Deno.errors.NetworkUnreachable, "network unreachable [http://non-existing]")
  })

  await t.step("slow response => fetch data => timeout error", async () => {
    const error = await fetchData("https://google.com", {method: "GET"}, fetch, 1)
    assertIsError(error, Deno.errors.TimedOut, "timeout error")
  })

  await t.step("aborted request => fetch data => abort error", async () => {
    const controller = new AbortController()
    controller.abort()

    const error = await fetchData("https://google.com", {method: "GET", signal: controller.signal}, fetch)
    assertIsError(error, Deno.errors.ConnectionAborted, "abort error")
  })

  await t.step("server error => fetch data => error response", async () => {
    const error = await fetchData("url", {}, () => Promise.reject(new Error("error")))
    assertIsError(error, Error, "error")
  })

})
