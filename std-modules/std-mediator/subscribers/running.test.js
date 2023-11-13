import { assertRejects } from "/asserts.ts"
import { spy, assertSpyCalls } from "/mock.ts"
import { createMessage } from "../fixtures.js"
import { createSubscriber } from "./creating.js"
import { registerSubscriber } from "./registering.js"
import { runSubscribers } from "./running.js"

Deno.test("using mediator", async (t) => {

  await t.step("registered subscribers => run subscribers => subscribers should run", async () => {
    const funcSpy = spy((message) => message.messageId == 1 && Promise.resolve(message))
    const message = createMessage(1, "msg type")
    const registeredSub1 = createSubscriber("sub1", message.messageType, funcSpy)
    const registeredSub2 = createSubscriber("sub2", message.messageType, funcSpy)
    const subs = {}
    registerSubscriber(registeredSub1, subs)
    registerSubscriber(registeredSub2, subs)

    await runSubscribers(message, subs)
    assertSpyCalls(funcSpy, 2)
  })

  await t.step("throwing error subscribers => run subscribers => subscribers run until first error", async () => {
    const func1 = (message) => message.messageId == 1 && Promise.reject(new Error("error"))
    const funcSpy2 = spy((message) => message.messageId == 1 && Promise.resolve(message))
    const message = createMessage(1, "msg type")
    const registeredSub1 = createSubscriber("sub1", message.messageType, func1)
    const registeredSub2 = createSubscriber("sub2", message.messageType, funcSpy2)
    const subs = {}
    registerSubscriber(registeredSub1, subs)
    registerSubscriber(registeredSub2, subs)

    await assertRejects(() =>  runSubscribers(message, subs), Error, "error")
    assertSpyCalls(funcSpy2, 0)
  })

})