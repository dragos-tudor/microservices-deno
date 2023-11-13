
export const closeNotificationsDb = (db) => db.isClosed || db.close(true)