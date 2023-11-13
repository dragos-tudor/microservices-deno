import { assertEquals, assertRejects } from "/asserts.ts"
import { spy, assertSpyCalls } from "/mock.ts"
import { createJobState, JobStatus } from "../job-states/creating.js"
import { createJob } from "./creating.js"
import { runJob } from "./running.js"

Deno.test("using jobs", async (t) => {

  const getUtc = (currentDate = 0) => () => currentDate * 1000

  await t.step("pending job => run job => job func run", async () => {
    const funcSpy = spy(() => Promise.resolve())
    const job = createJob("test", funcSpy, 1)
    const pendingState = createJobState()
    await runJob([job, pendingState], getUtc(1))

    assertSpyCalls(funcSpy, 1)
  })

  await t.step("running job => run job => job func not run", async () => {
    const funcSpy = spy(() => Promise.resolve())
    const job = createJob("test", funcSpy, 1)
    const runningState = createJobState(JobStatus.running)
    await runJob([job, runningState], getUtc(0))

    assertSpyCalls(funcSpy, 0)
  })

  await t.step("next date job greather than current date => run job => job func not run", async () => {
    const funcSpy = spy(() => Promise.resolve())
    const job = createJob("test", funcSpy, 1)
    const jobState = createJobState(JobStatus.pending, 5000)
    await runJob([job, jobState], getUtc(3))

    assertSpyCalls(funcSpy, 0)
  })

  await t.step("job with interval => run job after interval => job func run", async () => {
    const funcSpy = spy(() => Promise.resolve())
    const interval = 5
    const job = createJob("test", funcSpy, interval)
    const jobState = createJobState()
    await runJob([job, jobState], getUtc(0))
    await runJob([job, jobState], getUtc(interval / 2))
    await runJob([job, jobState], getUtc(interval))

    assertSpyCalls(funcSpy, 2)
  })

  await t.step("error-throwing job func => run job => job state is reset", async () => {
    const funcSpy = spy(() => Promise.reject())
    const job = createJob("test", funcSpy, 10)
    const jobState = createJobState()

    await assertRejects(() => runJob([job, jobState], getUtc(3)))
    assertEquals(jobState.status, JobStatus.pending)
    assertEquals(jobState.nextDate, 13000)
  })

})