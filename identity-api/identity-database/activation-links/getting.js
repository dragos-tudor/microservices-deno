
const getActivationLinkQuery = (columns) => `
  SELECT ${columns.join(",") || "*"}
  FROM activationlink
  WHERE activationLinkId = ?`

const getActivationLinkByUserNameQuery = (columns) => `
  SELECT ${columns.join(",") || "*"}
  FROM activationlink
  WHERE userName = ?
  ORDER BY expiresAt DESC
  LIMIT 1`

export const getDbActivationLink = (activationLinkId, db, ...columns) =>
  Promise.resolve(db.queryEntries(getActivationLinkQuery(columns), [activationLinkId])?.[0])

export const getDbActivationLinkByUserName = (userName, db, ...columns) =>
  Promise.resolve(db.queryEntries(getActivationLinkByUserNameQuery(columns), [userName])?.[0])
