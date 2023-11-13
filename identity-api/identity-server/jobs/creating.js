import { JobStatus, createJobState } from "../../../std-modules/std-scheduler/mod.js"
import { createResumeMessagesJob } from "../../identity-jobs/mod.js"

export const createJobs = (apiContext) => [
  [createResumeMessagesJob(apiContext), createJobState(JobStatus.pending)]
]