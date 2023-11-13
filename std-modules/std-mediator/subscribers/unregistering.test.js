import { assertEquals } from "/asserts.ts"
import { createSubscriber } from "./creating.js"
import { registerSubscriber } from "./registering.js"
import { unregisterSubscriber } from "./unregistering.js"

Deno.test("using mediator", async (t) => {

  await t.step("registered subscriber => unregister subscriber => subscriber unregistered", () => {
    const registeredSub = createSubscriber("sub", "msg type", console.log)
    const subs = {}
    registerSubscriber(registeredSub, subs)
    unregisterSubscriber("msg type", "sub", subs)

    assertEquals(subs["msg type"], [])
  })

  await t.step("registered subscribers => unregister one subscriber => subscriber unregistered", () => {
    const registeredSub1 = createSubscriber("sub1", "msg type", console.log)
    const registeredSub2 = createSubscriber("sub2", "msg type", console.info)
    const subs = {}
    registerSubscriber(registeredSub1, subs)
    registerSubscriber(registeredSub2, subs)
    unregisterSubscriber("msg type", "sub1", subs)

    assertEquals(subs["msg type"], [registeredSub2])
  })

})