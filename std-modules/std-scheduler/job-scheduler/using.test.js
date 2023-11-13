import { assertAlmostEquals } from "/asserts.ts"
import { spy } from "/mock.ts"
import { createJobOptions } from "../job-options/creating.js"
import { createJobScheduler } from "./creating.js"
import { createJob } from "../jobs/creating.js"
import { runJob } from "../jobs/running.js"
import { JobStatus, createJobState } from "../job-states/creating.js";

Deno.test("using jobs", async (t) => {

  await t.step("job scheduler => start scheduler => run jobs at interval", async () => {
    const funcSpy = spy(() => Promise.resolve())
    const job = createJob("test", funcSpy, 10 / 1000)
    const jobState = createJobState(JobStatus.pending)
    const scheduler = createJobScheduler(setInterval, clearInterval, Date.now, createJobOptions(5))

    const schedulerId = scheduler.start([ [job, jobState] ], runJob)
    await waitFor(40)
    scheduler.stop(schedulerId)

    const tolerance = 1
    assertAlmostEquals(funcSpy.calls.length, 4, tolerance)
  })

})

const waitFor = (interval) =>
  new Promise((resolve) => setTimeout(() => resolve(), interval))