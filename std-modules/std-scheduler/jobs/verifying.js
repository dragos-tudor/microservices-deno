import { JobType } from "./creating.js"

export const isValidJob = (job) => job.$type === JobType

