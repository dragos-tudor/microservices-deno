
export const calculateNextRun = (job, currentDate) =>
  job.jobInterval + currentDate