
const createPermissionTableQuery =
  `CREATE TABLE IF NOT EXISTS permission (
    permissionId INTEGER NOT NULL,
    role TEXT NOT NULL,
    PRIMARY KEY ( permissionId, role )
  )`

export const createPermissionTable = (db) => Promise.resolve(db.execute(createPermissionTableQuery))