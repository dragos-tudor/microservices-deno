import { runSubscribers } from "../subscribers/running.js"

export const publishMessage = async (message, subscribers) =>
  await runSubscribers(message, subscribers)
