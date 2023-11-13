import { assertEquals } from "/asserts.ts"
import { globalRateLimitingMiddleware, ipRateLimitingMiddleware, rateLimitingMiddleware } from "./rate.limiting.js"
import { createHeaders, createRealIpHeader } from "../../webapi-headers/mod.js";


Deno.test("to protect against DOS and DDOS attacks => use global rate limiting middlewares", async (t) => {

  await t.step("inside interval rate state => global rate limiting middleware => next middleware called", async () => {
    const rateLimits = { requestsLimit: 10, requestsInterval: 10 }
    const rateState = { requestsCounter: 7, startDate: 5 }
    const actual = await globalRateLimitingMiddleware(rateLimits, rateState, () => 1)(getContext(), () => "next")
    assertEquals(actual, "next")
  })

  await t.step("over interval rate state => global rate limiting middleware => next middleware called", async () => {
    const rateLimits = { requestsLimit: 5, requestsInterval: 10 }
    const rateState = { requestsCounter: 7, startDate: 5 }
    const actual = await globalRateLimitingMiddleware(rateLimits, rateState, () => 15)(getContext(), () => "next")
    assertEquals(actual, "next")
  })

  await t.step("over limit rate state counter => global rate limiting middleware => service unavailable error", async () => {
    const rateLimits = { requestsLimit: 5, suspendInterval: 10 }
    const rateState = { requestsCounter: 7 }
    const context = getContext()
    await globalRateLimitingMiddleware(rateLimits, rateState, () => 1)(context, () => {})
    assertEquals(context.response.status, 503)
  })

})

Deno.test("to protect against DOS and DDOS attacks => use ip rate limiting middlewares", async (t) => {

  await t.step("inside interval rate state => ip rate limiting middleware => next middleware called", async () => {
    const rateLimits = { requestsLimit: 10, requestsInterval: 10 }
    const rateState = { requestsCounter: 7, startDate: 5 }
    const actual = await ipRateLimitingMiddleware(rateLimits, rateState, () => 1)(getContext("ip1"), () => "next")
    assertEquals(actual, "next")
  })

  await t.step("over interval rate state=> ip rate limiting middleware => next middleware called", async () => {
    const rateLimits = { requestsLimit: 5, requestsInterval: 10 }
    const rateState = { requestsCounter: 7, startDate: 5 }
    const actual = await ipRateLimitingMiddleware(rateLimits, rateState, () => 15)(getContext("ip1"), () => "next")
    assertEquals(actual, "next")
  })

  await t.step("over limit rate state counter  => ip rate limiting middleware => too many requets", async () => {
    const rateLimits = { requestsLimit: 5, suspendInterval: 10 }
    const rateState = { requestsCounter: 7 }
    const context = getContext("ip1")
    await ipRateLimitingMiddleware(rateLimits, rateState, () => 1)(context, () => {})
    assertEquals(context.response.status, 429)
  })

})

Deno.test("to protect against DOS and DDOS attacks => use rate limiting middlewares", async (t) => {

  await t.step("inside interval rate state => multiple rate limiting middleware => next middleware called", async () => {
    const rateLimits = {
      global: { requestsLimit: 5, requestsInterval: 10 },
      ip: { requestsLimit: 5, requestsInterval: 10 }
    }
    const rateState = {
      global: { requestsCounter: 7 },
      ip1: { requestsCounter: 7 }
    }
    assertEquals(await rateLimitingMiddleware(rateLimits, {}, () => 1)(getContext("ip1"), () => "next"), "next")
    assertEquals(await rateLimitingMiddleware(rateLimits, rateState, () => 1)(getContext("ip1"), () => "next"), "next")
  })

})

const getContext = (ip) => ({
  request: { url: "http://localhost", headers: createHeaders(createRealIpHeader(ip)) },
  response: {}
})