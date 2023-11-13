
export const createDbNotification = (notificationId, email, emailContent, notificationDate = Date.now()) => Object.freeze({
  notificationId, email, emailContent, notificationDate
})