
const createAccountTableQuery =
  `CREATE TABLE IF NOT EXISTS account (
    userName TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    role TEXT NOT NULL,
    password TEXT NULL,
    passwordSalt TEXT NULL,
    isActive INTEGER NOT NULL
  )`

export const createAccountTable = (db) => Promise.resolve(db.execute(createAccountTableQuery))