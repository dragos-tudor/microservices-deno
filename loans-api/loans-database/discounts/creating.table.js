
const createDiscountTableQuery =
  `CREATE TABLE IF NOT EXISTS discount (
    discountType TEXT PRIMARY KEY,
    percent NUMBER NOT NULL
  )`

export const createDiscountTable = (db) =>
  Promise.resolve(db.execute(createDiscountTableQuery))