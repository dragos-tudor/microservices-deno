import { createJob } from "../../../std-modules/std-scheduler/mod.js"
import { getJobOptions } from "../../identity-config/mod.js"
import { resumeMessages } from "./resuming.js"

const JobName = "resume.messages"
const JobInterval = 15
const MessagesLimit = 25

export const createResumeMessagesJob = (apiContext) =>
{
  const jobOptions = getJobOptions(apiContext.apiConfig, JobName)
  const jobInterval = jobOptions?.jobInterval || JobInterval
  const messagesLimit = jobOptions?.messagesLimit || MessagesLimit
  return createJob(JobName, () => resumeMessages(messagesLimit, apiContext), jobInterval)
}