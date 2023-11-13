
const createInterestTableQuery =
  `CREATE TABLE IF NOT EXISTS interest (
    loanType TEXT PRIMARY KEY,
    percent NUMBER NOT NULL
  )`

export const createInterestTable = (db) =>
  Promise.resolve(db.execute(createInterestTableQuery))