
const exceptSubscriber = (subscriberId) => (subscriber) =>
  subscriber.subscriberId !== subscriberId

export const unregisterSubscriber = (messageType, subscriberId, subscribers) =>
  subscribers[messageType] = subscribers[messageType]
    .filter(exceptSubscriber(subscriberId))
