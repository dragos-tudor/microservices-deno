import { SubscriberType } from "./creating.js"

export const validateSubscriber = (subscriber) =>
  subscriber.$type === SubscriberType? "": "subscriber should have subscriber type"