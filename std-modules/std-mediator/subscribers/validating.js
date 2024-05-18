import { SubscriberType } from "./creating.js"
import { getAllSubscribers } from "./getting.js"

export const validateSubscriber = (subscriber, subscribers) =>
  (subscriber.$type === SubscriberType? "": "subscriber should have subscriber type") ||
  (!getAllSubscribers(subscribers).some(sub => sub.subscriberId == subscriber.subscriberId)? "": `duplicate subscriber ${subscriber.subscriberId}`)
