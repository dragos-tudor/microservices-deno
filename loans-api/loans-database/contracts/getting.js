
const getContractQuery = `
  SELECT contractId, userName, value, interestRate, status
  FROM contract
  WHERE contractId = ?`

export const getDbContract = (contractId, db) =>
  Promise.resolve(db.queryEntries(getContractQuery, [contractId])?.[0])