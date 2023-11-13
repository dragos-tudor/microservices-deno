
const updateContractStatusQuery = `
  UPDATE contract
  SET status = ?
  WHERE contractId = ?
  RETURNING contractId`

export const updateDbContractStatus = (contractId, status, db) =>
  Promise.resolve(db.query(updateContractStatusQuery, [status, contractId])?.[0][0])
