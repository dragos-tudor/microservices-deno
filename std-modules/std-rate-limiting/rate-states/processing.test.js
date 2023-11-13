import { assertEquals } from "/asserts.ts"
import { processRateState } from "./processing.js"
import { isRateStateSuspended } from "./verifying.js"

Deno.test("using rate limiting", async (t) => {

  await t.step("inside limits rate state => process rate state => requests counter incremented", () => {
    const rateState = { requestsCounter: 3, startDate: 1 }
    const rateLimits = { requestsInterval: 10 }
    const actual = processRateState(rateState, rateLimits, 5)

    assertEquals(actual.requestsCounter, 4)
  })

  await t.step("inside limits rate state => process rate state => rate state not resetted", () => {
    const rateState = { requestsCounter: 3, startDate: 1 }
    const rateLimits = { requestsInterval: 10 }
    const actual = processRateState(rateState, rateLimits, 5)

    assertEquals(actual.startDate, 1)
  })

  await t.step("inside limits rate state => process rate state => rate state not suspended", () => {
    const rateState = { requestsCounter: 3, startDate: 1 }
    const rateLimits = { requestsInterval: 10 }
    const actual = processRateState(rateState, rateLimits, 5)

    assertEquals(actual.suspendedUntil, undefined)
  })

  await t.step("over interval rate state => process rate state => rate state resetted", () => {
    const overIntervalDate = 15
    const rateState = { requestsCounter: 3, startDate: 1 }
    const rateLimits = { requestsInterval: 10 }
    const actual = processRateState(rateState, rateLimits, overIntervalDate)

    assertEquals(actual.requestsCounter, 1)
    assertEquals(actual.startDate, 15)
  })

  await t.step("over limits rate state counter => process rate state => rate state suspended", () => {
    const overLimitsRateState = { requestsCounter: 11 }
    const rateLimits = { requestsLimit: 10, suspendInterval: 20 }
    const actual = processRateState(overLimitsRateState, rateLimits, 5)

    assertEquals(actual.suspendedUntil, 25)
  })

  await t.step("over suspended rate state date => process rate state => rate state resseted", () => {
    const overSuspendedDate = 25
    const rateState = { requestsCounter: 11, suspendedUntil: 20 }
    const rateLimits = { requestsLimit: 10 }
    const actual = processRateState(rateState, rateLimits, overSuspendedDate)

    assertEquals(actual.requestsCounter, 1)
    assertEquals(actual.suspendedUntil, undefined)
  })

  await t.step("inside limits rate state => multiple process rate state => rate state not suspended", () => {
    const rateState = { requestsCounter: 3, startDate: 1 }
    const rateLimits = { requestsInterval: 10 }
    const rateState1 = processRateState(rateState, rateLimits, 5)
    assertEquals(isRateStateSuspended(rateState1), false)

    const rateState2 = processRateState(rateState1, rateLimits, 7)
    assertEquals(isRateStateSuspended(rateState2), false)
  })

})