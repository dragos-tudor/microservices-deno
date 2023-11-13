
const createRoleTableQuery =
  `CREATE TABLE IF NOT EXISTS role (
    roleName TEXT PRIMARY KEY
  )`

export const createRoleTable = (db) => Promise.resolve(db.execute(createRoleTableQuery))