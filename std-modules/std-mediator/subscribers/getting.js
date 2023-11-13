
export const getSubscribers = (messageType, subscribers) =>
  subscribers[messageType] || []