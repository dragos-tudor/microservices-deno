
const existRecordsQuery = `
  SELECT 1
  FROM permission
  LIMIT 1`

export const existDbRecords = (db) =>
  Promise.resolve(db.query(existRecordsQuery)?.[0])