
const insertRoleQuery = `
  INSERT INTO role (roleName)
  VALUES (?)
  RETURNING roleName`

export const insertDbRole = ({roleName}, db) =>
  Promise.resolve(db.query(insertRoleQuery, [roleName])?.[0][0])
