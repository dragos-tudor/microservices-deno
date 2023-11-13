
export const JobType = Symbol("job")

export const createJob = (name, func, jobInterval) => Object.freeze({
  name,
  func,
  jobInterval: jobInterval * 1000,
  $type: JobType
})