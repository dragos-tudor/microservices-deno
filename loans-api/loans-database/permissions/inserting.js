
const insertPermissionQuery = `
  INSERT INTO permission (permissionId, role)
  VALUES (?, ?)
  RETURNING *`

export const insertDbPermission = ({permissionId, role}, db) =>
  Promise.resolve(db.query(insertPermissionQuery, [permissionId, role])?.[0])
