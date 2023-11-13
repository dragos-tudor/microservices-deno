import { throwError } from "../../std-errors/mod.js"
import { validateSubscriber } from "./validating.js"

export const registerSubscriber = (subscriber, subscribers) =>
  throwError(validateSubscriber(subscriber)) ||
  (subscribers[subscriber.messageType]?
    subscribers[subscriber.messageType].push(subscriber):
    subscribers[subscriber.messageType] = [subscriber],
  subscriber)