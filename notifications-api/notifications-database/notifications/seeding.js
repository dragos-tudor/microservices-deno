import { insertDbNotification } from "./inserting.js"

export const seedNotificationTable = (notifications, db) =>
  Promise.all(notifications.map(notification => insertDbNotification(notification, db)))
