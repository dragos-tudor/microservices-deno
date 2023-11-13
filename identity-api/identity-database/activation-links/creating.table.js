
const createActivationLinkTableQuery =
  `CREATE TABLE IF NOT EXISTS activationlink (
    activationLinkId TEXT PRIMARY KEY,
    userName TEXT NOT NULL,
    expiresAt NUMERIC NOT NULL
  )`

export const createActivationLinkTable = (db) => Promise.resolve(db.execute(createActivationLinkTableQuery))