
export const getAllSubscribers = (subscribers) =>
  Object.values(subscribers).flatMap(subs => subs)

export const getSubscribers = (messageType, subscribers) =>
  subscribers[messageType] || []