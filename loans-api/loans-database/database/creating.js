import { DB } from "/sqlite.ts"

export const createLoansDb = (path, options) => new DB(path, options)