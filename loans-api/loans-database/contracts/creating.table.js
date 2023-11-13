
const createContractTableQuery =
  `CREATE TABLE IF NOT EXISTS contract (
    contractId TEXT PRIMARY KEY,
    userName TEXT NOT NULL,
    value NUMBER NOT NULL,
    interestRate NUMBER NOT NULL,
    status Number NOT NULL
  )`

export const createContractTable = (db) =>
  Promise.resolve(db.execute(createContractTableQuery))