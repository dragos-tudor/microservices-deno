
const getPermissionQuery = () => `
  SELECT permissionId, role
  FROM permission
  WHERE permissionId = ? AND
        role = ?`

export const getDbPermission = (permissionId, role, db) =>
  Promise.resolve(db.queryEntries(getPermissionQuery(), [permissionId, role])?.[0])
