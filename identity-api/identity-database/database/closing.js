
export const closeIdentityDb = (db) => db.isClosed || db.close(true)