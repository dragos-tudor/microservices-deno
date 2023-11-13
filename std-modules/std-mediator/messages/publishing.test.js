import { spy, assertSpyCalls } from "/mock.ts"
import { createMessage } from "../fixtures.js"
import { createSubscriber } from "../subscribers/creating.js"
import { registerSubscriber } from "../subscribers/registering.js"
import { publishMessage } from "./publishing.js"

Deno.test("using mediator", async (t) => {

  await t.step("message => publish message => subscribers get message", async () => {
    const funcSpy = spy((message) => message.id === 1 && Promise.resolve(message))
    const message = createMessage(1, "msg type")
    const subs = {}
    registerSubscriber(createSubscriber("sub1", "msg type", funcSpy), subs)
    registerSubscriber(createSubscriber("sub2", "msg type", funcSpy), subs)

    await publishMessage(message, subs)
    assertSpyCalls(funcSpy, 2)
  })

  await t.step("message => publish message once => subscribers get message once", async () => {
    const funcSpy = spy((message) => message.id === 1 && Promise.resolve(message))
    const message = createMessage(1, "msg type")
    const subs = {}
    registerSubscriber(createSubscriber("sub", "msg type", funcSpy), subs)

    await publishMessage(message, subs)
    assertSpyCalls(funcSpy, 1)
  })

  await t.step("message => publish message twice => subscribers get message twice", async () => {
    const funcSpy = spy((message) => message.id === 1 && Promise.resolve(message))
    const message = createMessage(1, "msg type")
    const subs = {}
    registerSubscriber(createSubscriber("sub", "msg type", funcSpy), subs)

    await publishMessage(message, subs)
    await publishMessage(message, subs)
    assertSpyCalls(funcSpy, 2)
  })

})