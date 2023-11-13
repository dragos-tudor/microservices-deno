
export const SubscriberType = Symbol("subscriber")

export const createSubscriber = (subscriberId, messageType, func) => Object.freeze({
  subscriberId, messageType, func, $type: SubscriberType
})