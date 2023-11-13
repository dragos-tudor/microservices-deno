
const getRoleQuery = `
  SELECT roleName
  FROM role
  WHERE roleName = ?`

const getRolesQuery = `
  SELECT roleName
  FROM role`

export const getDbRole = (roleName, db) =>
  Promise.resolve(db.queryEntries(getRoleQuery, [roleName])?.[0])

export const getDbRoles = (db) =>
  Promise.resolve(db.queryEntries(getRolesQuery))