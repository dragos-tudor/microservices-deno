import { calculateNextRun } from "../job-states/calculating.js"
import { setNextDate, setRunningStatus, setPendingStatus } from "../job-states/setting.js"
import { isRunnableJob, isValidJobState } from "../job-states/verifying.js"
import { isValidJob } from "./verifying.js"

export const runJob = async ([job, jobState], getUtc) =>
{
  if(!isValidJob(job)) return
  if(!isValidJobState(jobState)) return
  if(!isRunnableJob(jobState, getUtc())) return

  try {
    setRunningStatus(jobState)
    await job.func()
  }
  finally {
    setNextDate(jobState, calculateNextRun(job, getUtc()))
    setPendingStatus(jobState)
  }

  return jobState
}
