
const createNotificationTableQuery =
  `CREATE TABLE IF NOT EXISTS notification (
    notificationId TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    emailContent TEXT NOT NULL,
    notificationDate NUMBER NOT NULL
  )`

export const createNotificationTable = (db) => Promise.resolve(db.execute(createNotificationTableQuery))