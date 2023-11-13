
const getAccountQuery = (columns) => `
  SELECT ${columns.join(",") || "*"}
  FROM account
  WHERE userName = ?`

const getActiveAccountQuery = (columns) => `
  SELECT ${columns.join(",") || "*"}
  FROM account
  WHERE userName = ? AND
        isActive = 1`

const getAccountByEmailQuery = (columns) => `
  SELECT ${columns.join(",") || "*"}
  FROM account
  WHERE email = ?`

export const getDbAccount = (userName, db, ...columns) =>
  Promise.resolve(db.queryEntries(getAccountQuery(columns), [userName])?.[0])

export const getActiveDbAccount = (userName, db, ...columns) =>
  Promise.resolve(db.queryEntries(getActiveAccountQuery(columns), [userName])?.[0])

export const getDbAccountByEmail = (email, db, ...columns) =>
  Promise.resolve(db.queryEntries(getAccountByEmailQuery(columns), [email])?.[0])