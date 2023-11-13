import { DB } from "/sqlite.ts"

export const createIdentityDb = (path, options) => new DB(path, options)