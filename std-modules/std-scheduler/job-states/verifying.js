import { JobStatus, JobStateType } from "./creating.js"

const isDueDate = (jobState, currentDate) => currentDate >= jobState.nextDate

const isPendingStatus = (jobState) => jobState.status == JobStatus.pending

export const isRunnableJob = (jobState, currentDate) =>
  isPendingStatus(jobState) && isDueDate(jobState, currentDate)

export const isValidJobState = (jobState) => jobState.$type === JobStateType
