
const DefaultColumns = ["notificationId", "email", "emailContent", "notificationDate"]

const getNotificationQuery = (columns) => `
  SELECT ${columns.join(",") || DefaultColumns}
  FROM notification
  WHERE notificationId = ?`

export const getDbNotification = (notificationId, db, ...columns) =>
  Promise.resolve(db.queryEntries(getNotificationQuery(columns), [notificationId])?.[0])
