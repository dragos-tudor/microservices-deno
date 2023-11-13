
const insertNotificationQuery = `
  INSERT INTO notification (notificationId, email, emailContent, notificationDate)
  VALUES (?, ?, ?, ?)
  RETURNING notificationId`

export const insertDbNotification = ({notificationId, email, emailContent, notificationDate}, db) =>
  Promise.resolve(db.query(insertNotificationQuery, [notificationId, email, emailContent, notificationDate])?.[0][0])
