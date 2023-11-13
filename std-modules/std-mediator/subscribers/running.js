import { getSubscribers } from "./getting.js"

export const runSubscribers = async (message, subscribers) =>
{
  for (const subscriber of getSubscribers(message.messageType, subscribers))
    await subscriber.func(message)
}