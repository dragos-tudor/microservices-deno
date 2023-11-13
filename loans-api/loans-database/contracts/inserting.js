
const insertContractQuery = `
  INSERT INTO contract (contractId, userName, value, interestRate, status)
  VALUES (?, ?, ?, ?, ?)
  RETURNING contractId`

export const insertDbContract = ({contractId, userName, value, interestRate, status}, db) =>
  Promise.resolve(db.query(insertContractQuery, [contractId, userName, value, interestRate, status])?.[0][0])