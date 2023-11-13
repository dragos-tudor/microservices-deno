import { EventTypes } from "./events.js"

export const createNotificationRegisteredEvent = (notificationId, email, emailContent, version = 1) => Object.freeze({
  eventType: EventTypes.notificationRegistered, notificationId, email, emailContent, version
})