import { DB } from "/sqlite.ts"

export const createNotificationsDb = (path, options) => new DB(path, options)