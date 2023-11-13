import { SchedulerOptions } from "../job-options/creating.js"

export const createJobScheduler = (
  startTimer = setInterval,
  stopTimer = clearInterval,
  getUtc = Date.now,
  options = SchedulerOptions,
) =>
  Object.freeze({
    start: (jobs, runJob) => startTimer(
      () => jobs.forEach(async job => await runJob(job, getUtc)),
      options.runInterval
    ),
    stop: (timerId) => stopTimer(timerId),
  })