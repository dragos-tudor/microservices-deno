
const updateAccountPasswordQuery = `
  UPDATE account
  SET password = ?,
      passwordSalt = ?
  WHERE userName = ?`

const updateAccountIsActiveQuery = `
  UPDATE account
  SET isActive = ?
  WHERE userName = ?`

export const updateDbAccountPassword = (userName, password, passwordSalt, db) =>
  Promise.resolve(db.queryEntries(updateAccountPasswordQuery, [password, passwordSalt, userName])?.[0])

export const updateDbAccountIsActive = (userName, isActive, db) =>
  Promise.resolve(db.queryEntries(updateAccountIsActiveQuery, [isActive, userName])?.[0])