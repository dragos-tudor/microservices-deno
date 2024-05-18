import { assertEquals, assertThrows } from "/asserts.ts"
import { createSubscriber } from "./creating.js"
import { registerSubscriber } from "./registering.js"

Deno.test("using mediator", async (t) => {

  await t.step("new subscribers => register subscribers => subscribers should be registered", () => {
    const newSub1 = createSubscriber("sub1", "msg type", console.log)
    const newSub2 = createSubscriber("sub2", "msg type", console.info)
    const subs = {}
    registerSubscriber(newSub1, subs)
    registerSubscriber(newSub2, subs)

    assertEquals(subs["msg type"], [newSub1, newSub2])
  })

  await t.step("registered subscriber => register new subscriber with same id => duplicate subscriber error", () => {
    const oldSub = createSubscriber("sub", "msg type", console.log)
    const newSub = createSubscriber("sub", "msg type", console.info)
    const subs = {}

    registerSubscriber(oldSub, subs)
    assertThrows(() => registerSubscriber(newSub, subs), Error, "duplicate subscriber sub")
  })

  await t.step("invalid subscriber => register subscriber => validation error", () => {
    const invalidSub = {}
    const subs = {}
    assertThrows(() => registerSubscriber(invalidSub, subs), Error, "subscriber should have subscriber type")
  })

})