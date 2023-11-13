import { JobStatus } from "./creating.js"

export const setRunningStatus = (jobState) => jobState.status = JobStatus.running

export const setPendingStatus = (jobState) => jobState.status = JobStatus.pending

export const setNextDate = (jobState, nextDate) => jobState.nextDate = nextDate