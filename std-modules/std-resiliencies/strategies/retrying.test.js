import { assertEquals, assertIsError } from "/asserts.ts"
import { spy, assertSpyCalls } from "/mock.ts"
import { retry } from "./retrying.js"

Deno.test("using resiliency strategies", async (t) => {

  await t.step("non-throwing error func => retry few times => func result", async () => {
    const nonThrowError = () => [1]
    const [actual] = await retry(3, nonThrowError)

    assertEquals(actual, 1)
  })

  await t.step("non-throwing error func => retry few times => func called once", async () => {
    const nonThrowWErrorSpy = spy(() => [])
    await retry(3, nonThrowWErrorSpy)

    assertSpyCalls(nonThrowWErrorSpy, 1)
  })

  await t.step("throwing error func => retry few times => error thrown", async () => {
    const throwError = () => [undefined, new Error("error") ]
    const [_, actual] = await retry(1, throwError)

    assertIsError(actual, Error, "error")
  })

  await t.step("throwing error func => retry few times => func called few + 1 times", async () => {
    const throwErrorSpy = spy(() => [undefined, "error"])
    await retry(3, throwErrorSpy)

    assertSpyCalls(throwErrorSpy, 4)
  })

})
