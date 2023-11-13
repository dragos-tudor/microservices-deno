import { publishMessage } from "../messages/publishing.js"
import { registerSubscriber } from "../subscribers/registering.js"
import { unregisterSubscriber } from "../subscribers/unregistering.js"

export const createMediator = (subscribers = [], middleware = (message, next) => next(message)) => Object.freeze({
  publish: (message) => middleware(message, (msg) => publishMessage(msg, subscribers)),
  subscribe: (subscriber) => registerSubscriber(subscriber, subscribers),
  unsubscribe: (subscribeId) => unregisterSubscriber(subscribeId, subscribers)
})