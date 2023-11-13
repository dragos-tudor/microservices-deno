import { assertAlmostEquals, assertEquals, assertIsError } from "/asserts.ts"
import { spy, assertSpyCalls } from "/mock.ts"
import { expBackoff } from "./exp.backingoff.js"

Deno.test("using resiliency strategies", async (t) => {

  await t.step("non-throwing error func => exp backoff => func result", async () => {
    const nonThrowError = () => [1]
    const [actual] = await expBackoff([3], nonThrowError)

    assertEquals(actual, 1)
  })

  await t.step("non-throwing error func => exp backoff => func called once", async () => {
    const nonThrowErrorSpy = spy(() => [])
    await expBackoff([3], nonThrowErrorSpy)

    assertSpyCalls(nonThrowErrorSpy, 1)
  })

  await t.step("throwing error func => exp backoff => error thrown", async () => {
    const throwError = () => [undefined, new Error("error")]
    const [_, actual] = await expBackoff([3], throwError)

    assertIsError(actual, Error, "error")
  })

  await t.step("throwing error func and calling intervals => exp backoff => total duration is ~ intervals sum", async () => {
    const throwError = [undefined, new Error("error")]
    const start = Date.now()
    await expBackoff([3, 9, 27], () => throwError)

    assertAlmostEquals(Date.now() - start, 40, 5)
  })


})
