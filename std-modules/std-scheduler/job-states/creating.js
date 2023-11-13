
export const JobStateType = Symbol("job state")
export const JobStatus = Object.freeze({ pending: 0, running: 1 })

export const createJobState = (status = JobStatus.pending, nextDate = 0) => ({
  status,
  nextDate,
  $type: JobStateType
})