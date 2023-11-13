import { spy, assertSpyCalls } from "/mock.ts"
import { createMessage } from "../fixtures.js"
import { createSubscriber } from "../subscribers/creating.js"
import { createMediator } from "./creating.js"

Deno.test("using mediator", async (t) => {

  await t.step("mediator => publish message => subscribers get message", async () => {
    const funcSpy = spy((message) => message.id === 1 && Promise.resolve(message))
    const mediator = createMediator([])
    const message = createMessage(1, "msg type")
    mediator.subscribe(createSubscriber("sub1", "msg type", funcSpy))

    await mediator.publish(message)
    assertSpyCalls(funcSpy, 1)
  })

  await t.step("mediator => publish message => middleware get message", async () => {
    const funcSpy = spy((message) => message.id === 1 && Promise.resolve(message))
    const mediator = createMediator([], async (message, next) => { await funcSpy(message); await next(message) })
    const message = createMessage(1, "msg type")
    mediator.subscribe(createSubscriber("sub1", "msg type", funcSpy))

    await mediator.publish(message)
    assertSpyCalls(funcSpy, 2)
  })

})